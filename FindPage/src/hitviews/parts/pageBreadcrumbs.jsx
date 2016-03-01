import React from 'react'
import BreadCrumb from './breadcrumb'

const getList = function(list){
    if(!list) return null
    return(
        list.map((item, index) => {
            return(
                <BreadCrumb key={'pbc' + index} breadcrumbs={item} links={true} />
            )
        })
    )
}

export default ({list}) => (
  <div className={'content_list'}>
    {getList(list)}
  </div>
)
