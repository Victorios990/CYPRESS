import { faker } from '@faker-js/faker'     ///Gerar dados aletorios ///

const options = { env: { snapshotOnly: true } }

describe('Create Project', options, () => {
  beforeEach(() => {
    cy.api_deleteProjects()
    
    cy.login()
  })

  it('successfully', () => {
    const project = {
      name: `project-${faker.datatype.uuid()}`,  ///templete letters no MDM ( conctenar uma string com uma expressão JS)
      description: faker.random.words(5)
    }

    cy.gui_createProject(project)   ///Comando customizado para a criação do projeto


    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${project.name}`)
    cy.contains(project.name).should('be.visible')
    cy.contains(project.description).should('be.visible')
  })
})
