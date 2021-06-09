import React from 'react'
import { render } from '@testing-library/react'

const Title = ({ title }) => (
  <h1 data-testid="test">
    {title}
  </h1>
)

const renderApp = (App) => {
  const u = render(App)
  const el = u.getByTestId('test')
  return { el, body: el.textContent }
}
 
describe('React component', () => {
  test('hello world', () => {
    const App = () => {
      return (
        <div data-testid="test">
          Hello World
        </div>
      )
    }    
    const { body } = renderApp(<App />)
    expect(body).toBe("Hello World")
  })

  test('render with prop', () => {
    const { body } = renderApp(<Title title="Chapter 1" />)
    expect(body).toBe("Chapter 1")
  })

  test('render with constant', () => {
    const defaultTitle = "Hello World"
    const App = () => {
      return <Title title={defaultTitle} />
    }    
    const { body } = renderApp(<App />)
    expect(body).toBe("Hello World")
  })

  test('pass prop to grand child', () => {
    const UserProfile = ({ name }) => {
      return <Title title={name} />
    }
    const App = () => {
      return <UserProfile name="Fang" />
    }
    const { body } = renderApp(<App />)
    expect(body).toBe("Fang")
  })


})
