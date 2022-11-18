import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <>
    <Head>
      <title>{props.meetupData.title}</title>
    </Head>
    <MeetupDetail
      img={props.meetupData.img}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.description}
    />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://Sahil:sahil2000@cluster0.8iytytr.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  const paths = meetups.map((meetup) => {
    return { params: { meetupId: meetup._id.toString() } };
  });

  return {
    fallback: "blocking",
    paths: paths,
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://Sahil:sahil2000@cluster0.8iytytr.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });
  client.close();
    console.log(selectedMeetup);
  return {
    props: {
      meetupData: {
        img: selectedMeetup.image,
        title: selectedMeetup.title,
        description: selectedMeetup.description,
        address: selectedMeetup.address,
        id: selectedMeetup._id.toString()
      },
    },
  };
}

export default MeetupDetails;
