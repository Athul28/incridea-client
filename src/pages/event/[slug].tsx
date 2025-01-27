import { type GetStaticPaths, type GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { BiTimeFive } from "react-icons/bi";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import {
  IoCashOutline,
  IoInformationOutline,
  IoLocationOutline,
  IoPeopleOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";

import EventDetails from "~/components/general/event/eventDetails";
import EventRegistration from "~/components/general/event/eventRegistration";
import {
  EventByIdDocument,
  type EventByIdQuery,
  PublishedEventsSlugDocument,
} from "~/generated/generated";
import { client } from "~/lib/apollo";

type Props =
  | {
      event: EventByIdQuery["eventById"];
      error?: never;
    }
  | {
      event?: never;
      error: string;
    };

const getStaticPaths: GetStaticPaths = async () => {
  const { data: events } = await client.query({
    query: PublishedEventsSlugDocument,
  });

  const paths = events.publishedEvents.map((event) => ({
    params: {
      slug: `${event.name.toLocaleLowerCase().split(" ").join("-")}-${
        event.id
      }`,
    },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
};

const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  try {
    if (!params?.slug || params.slug instanceof Array)
      throw new Error("Invalid event slug");

    const id = params.slug.split("-").pop();
    if (!id) throw new Error("Invalid event slug");

    const { data: event } = await client.query({
      query: EventByIdDocument,
      variables: {
        id: id,
      },
      fetchPolicy: "no-cache",
    });

    return {
      props: {
        event: event.eventById,
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      props: {
        error: error instanceof Error ? error.message : "Could not find event",
      },
      revalidate: 60,
    };
  }
};

const Page = ({ event, error }: Props) => {
  const getEventAttributes = () => {
    if (!event) return [];

    let teamSizeText = "",
      eventTypeText = "";
    if (event.minTeamSize === event.maxTeamSize) {
      if (event.minTeamSize !== 1)
        teamSizeText += `${event.minTeamSize} members per team`;
      if (event.minTeamSize === 0) teamSizeText = "";
    } else {
      teamSizeText = ` ${event.minTeamSize} - ${event.maxTeamSize} members per team`;
    }

    if (event.eventType.includes("MULTIPLE")) {
      eventTypeText =
        event.eventType.split("_")[0]![0] +
        event.eventType.split("_")[0]!.slice(1).toLowerCase() +
        " Event (Multiple Entry)";
    } else
      eventTypeText =
        event.eventType[0] + event.eventType.slice(1).toLowerCase() + " Event";

    eventTypeText = eventTypeText.replaceAll("Individual", "Solo");

    return [
      {
        name: "Venue",
        text: event.venue,
        Icon: IoLocationOutline,
      },
      {
        name: "Event Type",
        text: eventTypeText,
        Icon: IoPersonOutline,
      },
      {
        name: "Fees",
        text: event.fees,
        Icon: IoCashOutline,
      },
      {
        name: "Team Size",
        text: teamSizeText,
        Icon: IoPeopleOutline,
      },
      {
        name: eventTypeText ? "Maximum Participants" : "Maximum Teams", //eventTypeText would be empty for solo events
        text: event.maxTeams,
        Icon: IoInformationOutline,
      },
    ];
  };

  // #002C1B - main green
  // #054432 - secondary green
  // #D79128 - golden shine text
  // #5BC89E - light text green

  return (
    <div className={`relative flex items-center justify-center`}>
      <Image
        alt="events-bg"
        src="/assets/eventSlug/leo-edited.jpg"
        height={1920}
        width={1080}
        priority
        className={`absolute left-0 top-0 h-screen w-screen object-cover object-center `}
      />
      <Toaster />
      {error && (
        <div
          className={`absolute inset-0 flex h-screen flex-col items-center justify-center gap-5 p-10 text-white`}
        >
          <h1 className={`text-3xl font-semibold`}>Oops!</h1>
          <div className={`text-center`}>
            <p>
              Looks like you&apos;ve glitched out and got lost in the pixels!
            </p>
            <p>
              Click{" "}
              <Link className={`underline`} href={"/events"}>
                here
              </Link>{" "}
              to head back to the events page
            </p>
          </div>
          <p
            className={`rounded-md bg-red-200 px-4 py-2 text-center text-red-800`}
          >
            <b>Error message:</b> {error}
          </p>
        </div>
      )}
      {event && (
        <section
          className={`no-scrollbar mx-auto flex h-screen max-w-7xl flex-col gap-5 overflow-y-scroll text-white lg:flex-col`}
        >
          <div className={`px-3 pt-20 lg:h-full lg:pb-8`}>
            <div
              className={`basis-1/3 flex flex-col rounded-xl border border-[#D79128] bg-[#054432] bg-opacity-70 p-5 backdrop-blur-xl backdrop-filter lg:flex-row`}
            >
              <div>
                <Image
                  src={"/assets/eventSlug/LIR.png"}
                  className={`relative z-10 w-full rounded-t-md sm:rounded-md`}
                  alt={event.name}
                  width={1000}
                  height={1000}
                />
                {/*
                {event.image && (
                  <Image
                    // src="https://res.cloudinary.com/dg1941jdi/image/upload/v1706863440/Events/Usaravalli_1706863437635.png"
                    src={event.image}
                    className={`relative z-10 w-full rounded-t-md sm:rounded-md`}
                    alt={event.name}
                    width={1000}
                    height={1000}
                  />
                )}
                */}
              </div>
              <div className="lg:p-6 lg:mt-0 mt-3 flex flex-col">
                <h1
                  className={`lg:px-4 pb-0 text-center PTSerif text-3xl font-bold capitalize tracking-wider sm:p-0 md:text-6xl text-[#D79128]`}
                >
                  {event.name}
                </h1>
                <div className={`bodyFont mt-6 flex w-full flex-wrap gap-3`}>
                  {getEventAttributes().map((attr) =>
                    attr.text ? (
                      <div
                        key={attr.name}
                        className={`md:text-md flex w-full items-center gap-2 rounded-full border border-[#D79128] p-1 px-2 text-left text-md bg-[#D79128] bg-opacity-30`}
                      >
                        {<attr.Icon />}
                        <p>
                          {attr.name} {": "}
                        </p>
                        <p className={`leading-4`}>{attr.text}</p>
                      </div>
                    ) : (
                      <></>
                    ),
                  )}
                </div>
                <div className={`order-1 mt-3 flex w-full justify-center`}>
                  <EventRegistration
                    fees={event.fees}
                    eventId={event.id}
                    type={event.eventType}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col pt-6 gap-5 lg:flex-row">
              <div
                className={`w-full rounded-xl border border-[#D79128] bg-[#054432] bg-opacity-70 p-5 backdrop-blur-xl backdrop-filter`}
              >
                <div
                  className={`grow-0 space-y-4 rounded-md sm:space-y-10 lg:p-4`}
                >
                  <div className={`pb-4 sm:p-0`}>
                    {/*<EventDetails details={event.description ?? ""} />*/}
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Laborum, iure natus illo alias exercitationem est quaerat
                      asperiores ipsa, maiores placeat esse tempora libero id
                      aperiam accusamus reiciendis atque obcaecati nisi officiis
                      magni nostrum facilis tempore fuga! Minima officiis
                      distinctio earum? Quis velit atque, similique, quo sunt
                      minus fugit aperiam tempora commodi explicabo error hic
                      temporibus qui assumenda unde dicta saepe necessitatibus
                      obcaecati pariatur cumque provident, cupiditate officia
                      consequatur! Quas obcaecati aspernatur nemo animi? Minus
                      vel quis, eaque exercitationem unde dignissimos, est ipsam
                      nihil ipsum architecto odio optio, corrupti in quidem!
                      Minima tempore harum, quod mollitia totam inventore
                      suscipit corrupti? Corrupti.
                    </p>
                  </div>
                </div>
                <hr className="w-full border-t-2 border-[#D79128]" />
                <div className={`grid grid-cols-1 gap-2 mt-4`}>
                  {event.rounds.map((round) => (
                    <div
                      key={round.roundNo}
                      className={`bodyFont items-center space-y-2 rounded-xl border border-[#D79128] bg-opacity-30 px-3 py-2 text-white bg-[#D79128]`}
                    >
                      <div className={`font-semibold`}>
                        Round {round.roundNo}
                      </div>
                      <div className={`space-y-2`}>
                        <p
                          className={`flex items-center gap-2`}
                          suppressHydrationWarning
                        >
                          <BsFillCalendar2WeekFill />

                          {round.date
                            ? new Date(round.date).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                              })
                            : ""}
                        </p>
                        <p
                          className={`flex items-center gap-2`}
                          suppressHydrationWarning
                        >
                          <BiTimeFive />
                          {round.date
                            ? new Date(round.date).toLocaleDateString("en-IN", {
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                              })
                            : ""}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {event.organizers.length > 0 && (
                <div
                  className={`w-full lg:w-3/4 h-fit rounded-xl border border-[#D79128] bg-[#054432] bg-opacity-70 p-5 backdrop-blur-xl backdrop-filter`}
                >
                  <div className={`order-3 w-full`}>
                    <h2
                      className={`mb-2 font-VikingHell text-2xl tracking-wider md:text-4xl text-[#D79128] font-bold`}
                    >
                      Organizers
                    </h2>
                    <div className={`bodyFont w-full space-y-2`}>
                      {event.organizers.map((organizer, idx) => (
                        <div
                          key={idx}
                          className={`text-md w-full rounded-xl border border-[#D79128] p-3 text-white bg-[#D79128] bg-opacity-30`}
                        >
                          <h3 className={`mb-2 text-lg font-semibold`}>
                            {organizer.user.name}
                          </h3>
                          <div className={`flex flex-col gap-2`}>
                            {organizer.user.email && (
                              <a
                                href={`mailto:${organizer.user.email}`}
                                className={`inline-flex items-center gap-2 overflow-x-auto text-sm hover:underline hover:underline-offset-4`}
                              >
                                <MdOutlineMailOutline className={`text-lg`} />{" "}
                                {organizer.user.email}
                              </a>
                            )}
                            {organizer.user.phoneNumber && (
                              <a
                                href={`tel:${organizer.user.phoneNumber}`}
                                className={`inline-flex items-center gap-2 text-sm hover:underline hover:underline-offset-4`}
                              >
                                <BsFillTelephoneFill className={`text-lg`} />{" "}
                                {organizer.user.phoneNumber}
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Page;

export { getStaticPaths, getStaticProps };
