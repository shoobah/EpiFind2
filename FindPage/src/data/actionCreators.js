import fetch from 'isomorphic-fetch'
import Config from 'config'

// Dispatch when search is set to begin.
export const SEARCHSTART = 'SEARCHSTART'
function requestSearch (query) {
  return {
    type: SEARCHSTART,
    message: 'Started search',
  query}
}

export const SEARCHSUCCESS = 'SEARCHSUCCESS'
// Dispatch this when request returns
export function searchSuccess (json, query) {
  return {
    type: SEARCHSUCCESS,
    response: json,
    query: query,
    message: 'Found stuff'
  }
}

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    let error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

export const SEARCHFAILED = 'SEARCHFAILED'
function searchFailed (error) {
  return {
    type: SEARCHFAILED,
    message: error
  }
}

export const SETQUERY = 'SETQUERY'
export function setQuery(query){
    return{
        type: SETQUERY,
        query
    }
}

export const SETTABS = 'SETTABS'
export function setTabs(tabList){
    return{
        type: SETTABS,
        tabList
    }
}

export const RESETTABS = 'RESETTABS'
export function resetTabs(tabList){
    return{
        type: RESETTABS
    }
}

export const CLEARHITS = 'CLEARHITS'
export function clearHits () {
  return {
    type: CLEARHITS
  }
}

export function doSearch (query) {
  return (dispatch) => {
    dispatch(requestSearch(query))
    return fetch(Config.searchUrl, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(query)
    })
      .then(checkStatus)
      .then(response => response.json())
      .then(json => dispatch(searchSuccess(json, query)))
      .catch(error => {
        console.error('search',error)
        return dispatch(searchFailed(error))
      })
  }
}

//--------- autocomplete ---------

export const ACSTART = 'ACSTART'
function requestAutoComplete (query) {
  return {
        type: ACSTART,
        query
    }
}

export const ACSUCCESS = 'ACSUCCESS'
// Dispatch this when request returns
export function autoCompleteSuccess (json) {
  return {
    type: ACSUCCESS,
    response: json
  }
}

export const ACFAILED = 'ACFAILED'
function autoCompleteFailed (error) {
  return {
    type: ACFAILED,
    message: error
  }
}

export const ACRESET = 'ACRESET'
export function autoCompleteReset () {
  return {
    type: ACRESET
  }
}

export function getAutoComplete (term) {
  return (dispatch) => {
    dispatch(requestAutoComplete(term))
    return fetch(Config.autoCompleteUrl + '?term=' + term, {
      method: 'get',
      headers: {},
    })
      .then(checkStatus)
      .then(response => response.json())
      .then(json => dispatch(autoCompleteSuccess(json)))
      .catch(error => {
        console.error('autocomplete',error)
        return dispatch(autoCompleteFailed(error))
      })
  }
}

//--------- Menade du ---------
//DYM = Did You Mean :)

export const DYMSTART = 'DYMSTART'
function requestDYM (query) {
  return {
        type: DYMSTART,
        query
    }
}

export const DYMSUCCESS = 'DYMSUCCESS'
// Dispatch this when request returns
export function dymSuccess (json) {
  return {
    type: DYMSUCCESS,
    response: json
  }
}

export const DYMFAILED = 'DYMFAILED'
function dymFailed (error) {
  return {
    type: DYMFAILED,
    message: error
  }
}

export const DYMRESET = 'DYMRESET'
export function dymReset () {
  return {
    type: DYMRESET
  }
}

export function getDYM (url, term) {
  return (dispatch) => {
    dispatch(requestDYM(term))
    return fetch(url + '/_autocomplete?prefix=' + term + '&size=5', {
      method: 'get',
      headers: {},
    })
      .then(checkStatus)
      .then(response => response.json())
      .then(json => dispatch(dymSuccess(json)))
      .catch(error => {
        console.error('dym',error)
        return dispatch(dymFailed(error))
      })
  }
}

export const NEXT_AUTOCOMPLETE_ALTERNATIVE = 'NEXT_AUTOCOMPLETE_ALTERNATIVE';
export function nextAutocompleteAlternative() {
  return {
    type: NEXT_AUTOCOMPLETE_ALTERNATIVE
  }
}

export const PREVIOUS_AUTOCOMPLETE_ALTERNATIVE = 'PREVIOUS_AUTOCOMPLETE_ALTERNATIVE';
export function previousAutocompleteAlternative() {
  return {
    type: PREVIOUS_AUTOCOMPLETE_ALTERNATIVE
  }
}

export const RESET_AUTOCOMPLETE_ALTERNATIVE = 'RESET_AUTOCOMPLETE_ALTERNATIVE';
export function resetAutocompleteAlternative() {
  return {
    type: RESET_AUTOCOMPLETE_ALTERNATIVE
  }
}