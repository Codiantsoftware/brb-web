
const Cards = ({...props}) => {  
  return (
    <div className="cardSection_box">
      <img src={props.image} alt={props.title} />
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </div>
  )
}

export default Cards;