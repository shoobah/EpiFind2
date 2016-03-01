import  'react'
import Styles from '../../style/hitListStyle'

export default ({excerpt, key}) => {
  if(excerpt){
    return(
      <div key={'exc' + key} style={Styles.excerpt} dangerouslySetInnerHTML={{__html:excerpt}}></div>
    )
  } else {
    return(<div key={'exc' + key}></div>)
  }
}
