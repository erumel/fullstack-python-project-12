import filter from 'leo-profanity'

filter.add(filter.getDictionary('ru'))
filter.add(filter.getDictionary('en'))

export const cleanText = text => filter.clean(text)

export const hasBadWords = text => filter.check(text)
