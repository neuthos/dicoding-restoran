/* eslint-disable no-undef */
Feature('Liking Restos')

Before(({ I }) => {
  I.amOnPage('/#/like')
})

Scenario('liking one resto', ({ I }) => {
  I.see('Resto not found to be shown', '.resto-item__not__found')
  I.amOnPage('/')

  I.seeElement('.resto__name a')
  pause()
  I.click(locate('.resto__name a').first())
  pause()

  I.seeElement('#likeButton')
  I.click('#likeButton')

  I.amOnPage('/#/like')
  I.seeElement('.resto-item')
})
