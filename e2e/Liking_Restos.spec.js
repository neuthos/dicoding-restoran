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
  const firstResto = await locate('.resto__name a').first()
  const firstRestoName = await I.grabTextFrom(firstResto)

  I.click(firstResto)
  I.seeElement('#likeButton')
  I.click('#likeButton')

  I.amOnPage('/#/like')
  I.seeElement('.resto-item')

  const likedRestoName = await I.grabTextFrom('.resto__name')
  assert.strictEqual(firstRestoName, likedRestoName)
})
