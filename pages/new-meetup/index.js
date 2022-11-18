import Head from "next/head";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetup() {
  async function handleAddMeetup(meetupData) {
    const response = await fetch("/api/new-meetup", {
      body: JSON.stringify(meetupData),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);
  }
  return (
    <>
      <Head>
        <title>Add a meetup</title>
      </Head>
      <NewMeetupForm onAddMeetup={handleAddMeetup} />
    </>
  );
}

export default NewMeetup;
