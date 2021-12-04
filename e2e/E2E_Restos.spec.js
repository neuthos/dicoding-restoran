const assert = require('assert')

/* eslint-disable no-undef */
Feature('Liking Restos')

Before(({ I }) => {
  I.amOnPage('/#/like')
})

Scenario('showing empty liked restos', ({ I }) => {
  I.seeElement('#query')
  I.see('Resto not found to be shown', '.resto-item__not__found')
})

Scenario('liking one resto', async ({ I }) => {
  I.see('Resto not found to be shown', '.resto-item__not__found')
  I.amOnPage('/')

  I.seeElement('.resto__name a')
  const firstResto = locate('.resto__name a').first()
  const firstRestoName = await I.grabTextFrom(firstResto)

  I.click(firstResto)
  I.seeElement('#likeButton')
  I.click('#likeButton')

  I.amOnPage('/#/like')
  I.seeElement('.resto-item')

  const likedRestoName = await I.grabTextFrom('.resto__name')
  assert.strictEqual(firstRestoName, likedRestoName)
})

Scenario('unliking one resto', async ({ I }) => {
  I.see('Resto not found to be shown', '.resto-item__not__found')
  I.amOnPage('/')

  I.seeElement('.resto__name a')
  const firstResto = locate('.resto__name a').first()

  I.click(firstResto)
  I.seeElement('#likeButton')
  I.click('#likeButton')

  I.amOnPage('/#/like')
  I.seeElement('.resto-item')

  I.seeElement('.resto__name a')
  I.click(firstResto)
  I.seeElement('#likeButton')
  I.click('#likeButton')

  I.amOnPage('/#/like')
  I.see('Resto not found to be shown', '.resto-item__not__found')
})

Scenario('searching resto', async ({ I }) => {
  I.see('Resto not found to be shown', '.resto-item__not__found')

  I.amOnPage('/')

  I.seeElement('.resto__name a')

  const names = []

  for (let i = 1; i <= 3; i++) {
    I.click(locate('.resto__name a').at(i))
    I.seeElement('#likeButton')
    I.click('#likeButton')
    names.push(await I.grabTextFrom('.resto__title'))
    I.amOnPage('/')
  }

  I.amOnPage('/#/like')
  I.seeElement('#query')

  const searchQuery = names[1].substring(1, 3)
  const matchingRestos = names.filter((name) => name.indexOf(searchQuery) !== -1)

  I.fillField('#query', searchQuery)
  I.pressKey('Enter')

  const visibleLikedRestos = await I.grabNumberOfVisibleElements('.resto-item')
  assert.strictEqual(matchingRestos.length, visibleLikedRestos)

  matchingRestos.forEach(async (name, index) => {
    const variableName = await I.grabTextFrom(locate('.resto__name').at(index + 1))
    assert.strictEqual(name, variableName)
  })
})
