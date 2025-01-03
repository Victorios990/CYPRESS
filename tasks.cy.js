/// <reference types="cypress" />

describe('tarefas', () => {

    let testData;

    before(()=>
        cy.fixture('tasks').then(t => {
            testData = t
        })
    
    )

    context('cadastro', () => {
        it('deve cadastrar uma nova tarefa', () => {

        var taskName = 'Estudar muito sobre javaScript'

        cy.request({
            url: 'http://localhost:3333/helper/tasks',
            method: 'DELETE',
            body: {name: 'Estudar muito sobre javaScript'}
        }).then(response => {
            expect(response.status).to.eq(204)
        })
        
        cy.createTask(taskName)

        cy.contains('main div p', taskName)
            .should('be.visible')
        })

        it('Não deve permitir tarefa duplicada', ()=> {
        
        const task = testData.dup

        cy.removeTaskByName(task.name)

        cy.postTask(task)

        cy.visit('http://localhost:3000')

        cy.get('input[placeholder="Add a new Task')
            .type(task.name)
    
        cy.contains('button', 'Create').click()

        cy.get('.swal2-html-container')
            .should('be.visible')
            .should('have.text', 'Task already exists!')

        })

    it('Campo Obrigatorio', ()=> {
        cy.createTask()
//        cy.isRequired('This is a required field')       
   })
})
    context('atualização', () => {
        it.only('Deve encerrar uma tarefa', ()=> {
            const task = { 
                name: 'Estudar muito sobre javascript',
                is_done: false
        }

        cy.removeTaskByName(task.name)
        cy.postTask(task)


        cy.visit('http://localhost:3000')

        cy.contains('p', task.name)
            .parent()
            .find('button[class*=ItemToggle]')
            .click()

        cy.contains('p', task.name)
            .should('have.css', 'text-decoration-line', 'line-through')

        })

        
    })
})