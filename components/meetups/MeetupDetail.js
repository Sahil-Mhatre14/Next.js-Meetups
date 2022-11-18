import classes from "./MeetupDetail.module.css";

function MeetupDetail(props) {
  return (
    <div className={classes.details}>
      <img className={classes["meetup-img"]} src={props.img}></img>
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </div>
  );
}

export default MeetupDetail;
