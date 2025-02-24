import { Menu, Transition } from "@headlessui/react";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { type GetStaticProps } from "next";
import { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { CiWarning } from "react-icons/ci";
import { IoTodayOutline } from "react-icons/io5";

import Event from "~/components/event";
import {
  EventCategory,
  PublishedEventsDocument,
  type PublishedEventsQuery,
} from "~/generated/generated";
import { client } from "~/lib/apollo";

import { CONSTANT } from "~/constants";

enum AllCategory {
  ALL = "ALL",
}

type Props = { data: PublishedEventsQuery["publishedEvents"] };

const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const { data: events } = await client.query({
      query: PublishedEventsDocument,
      fetchPolicy: "no-cache",
    });
    return {
      props: {
        data: events.publishedEvents,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        data: [],
      },
      revalidate: 60,
    };
  }
};

const Page = ({ data }: Props) => {
  const containerRef = useRef(null);

  const dayFilters = ["All", "DAY 1", "DAY 2", "DAY 3"];

  const [currentDayFilter, setCurrentDayFilter] =
    useState<(typeof dayFilters)[number]>("All");
  const [currentCategoryFilter, setCurrentCategoryFilter] = useState<
    EventCategory | AllCategory
  >(AllCategory.ALL);
  const [query, setQuery] = useState("");

  const [filteredEvents, setFilteredEvents] = useState(data || []);

  useEffect(() => {
    let tempFilteredEvents = data;
    if (currentDayFilter !== "All") {
      const filteredDay = new Date(
        currentDayFilter === "DAY 1"
          ? CONSTANT.DATE.INCRIDEA.DAY1
          : currentDayFilter === "DAY 2"
            ? CONSTANT.DATE.INCRIDEA.DAY2
            : CONSTANT.DATE.INCRIDEA.DAY3,
      ).getDate();
      tempFilteredEvents = tempFilteredEvents.filter((event) =>
        event.rounds.some((round) => round.date && new Date(round.date).getDate() === filteredDay),
      );
    }
    if (currentCategoryFilter !== AllCategory.ALL)
      tempFilteredEvents = tempFilteredEvents.filter(
        (event) =>
          event.category.replace("_", "").toLowerCase() === currentCategoryFilter.toLocaleLowerCase()
      );

    setFilteredEvents(tempFilteredEvents);
  }, [currentDayFilter, currentCategoryFilter, data]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setCurrentDayFilter("All");
    setCurrentCategoryFilter(AllCategory.ALL);
    if (e.target.value === "") {
      setFilteredEvents(data || []);
    } else {
      setFilteredEvents(
        data.filter((event) =>
          event.name.toLowerCase().includes(e.target.value.toLowerCase()),
        ),
      );
    }
  };

  return (
    <div
      style={{ willChange: "transform" }}
      className="relative flex min-h-screen justify-center overflow-hidden"
    >
      <div className="mx-auto flex flex-col items-center justify-center px-5 sm:px-7 lg:px-10">
        <div className="no-scrollbar overflow-y-auto">
          <div
            data-scroll-container
            ref={containerRef}
            className={`relative px-2 md:px-10 ${filteredEvents.length > 0 ? "pt-28" : "pt-10 md:pt-20"
              } flex flex-col items-center justify-center`}
          >
            <div
              data-scroll-section
              className="mb-2 flex flex-col justify-center items-center"
            >
              <h1
                data-scroll
                className={`text-center font-life-craft tracking-wide text-white md:text-8xl text-5xl`}
              >
                Events
              </h1>

              <h2
                data-scroll
                className={`text-md mx-2 mb-6 mt-2 text-center tracking-wide text-white md:mt-4 md:text-xl font`}
              >
                40 Exciting Events Await, Each Marking a Unique Moment in Time&apos;s
                Journey!
              </h2>

              <div className="relative w-[80%] md:w-[100%] basis-full lg:basis-[75%]">
                <input
                  value={query}
                  onChange={handleSearch}
                  className="w-full rounded-full border border-primary-800/80 bg-black/30 p-3 pl-6 pr-14 text-white placeholder:text-gray-200 focus:outline-none"
                  placeholder="Search epic quests here..."
                  type="text"
                />
                <AiOutlineSearch
                  size={"1.4rem"}
                  className="absolute right-6 top-3 text-gray-200"
                />
              </div>
              <div className="flex flex-row md:px-10 py-4 w-full justify-between">
                <div className="flex justify-center md:flex-row items-center">
                  <Menu as="div" className="relative flex w-full md:w-auto">
                    <Menu.Button className="inline-flex h-[40px] w-[150px] min-w-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-primary-200/80 bg-black/30 px-4 py-2 text-sm text-white md:text-lg md:-ml-12">
                      <IoTodayOutline size="16" />
                      {currentDayFilter !== "All"
                        ? currentDayFilter
                          .toLowerCase()
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (char) => char.toUpperCase())
                        : "Day"}
                    </Menu.Button>
                    <Transition
                      enter="transition duration-300 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-300 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Menu.Items className="absolute top-11 mt-1 z-10 flex flex-col gap-2 overflow-hidden rounded-3xl border border-primary-300/80 bg-primary-800 p-2 text-center shadow-2xl shadow-black/80">
                        {dayFilters.map((filter) => (
                          <Menu.Item key={filter}>
                            {() => (
                              <button
                                className={`${currentDayFilter === filter
                                  ? "bg-white/20"
                                  : "bg-black/10"
                                  } w-36 rounded-full border border-primary-300/80 px-3 py-1.5 text-sm text-white transition-all duration-300 hover:bg-white/10`}
                                onClick={() => setCurrentDayFilter(filter)}
                              >
                                {
                                  filter
                                    .toLowerCase()
                                    .replace(/\b\w/g, (char) =>
                                      char.toUpperCase(),
                                    )
                                    .split(" ")[0]
                                }{" "}
                                {filter.split(" ")[1]}
                              </button>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                {/* Right Filter (Category Selector) */}
                <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
                  <Menu
                    as="div"
                    className="relative flex w-full justify-center md:w-auto"
                  >
                    <Menu.Button className="inline-flex h-[40px] w-[150px] min-w-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-primary-200/80 bg-black/30 px-4 py-2 text-sm text-white md:text-lg">
                      <BiCategory size="16" />
                      {currentCategoryFilter !== AllCategory.ALL
                        ? currentCategoryFilter
                          .toLowerCase()
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (char) => char.toUpperCase())
                        : "Category"}
                    </Menu.Button>
                    <Transition
                      enter="transition duration-300 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-300 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Menu.Items className="absolute top-11 mt-1 flex z-10 flex-col gap-2 overflow-hidden rounded-3xl border border-primary-300/80 bg-primary-800 p-2 text-center shadow-2xl shadow-black/70">
                        {[
                          Object.keys(EventCategory),
                          Object.keys(AllCategory),
                        ].map((e, idx) => {
                          return e.map((filter, id) => {
                            return (
                              <Menu.Item key={id * 100000000 + idx}>
                                <button
                                  className={`${currentCategoryFilter ===
                                    (filter as EventCategory | AllCategory)
                                    ? "bg-white/20"
                                    : "bg-black/10"
                                    } w-36 rounded-full border border-primary-200/80 px-3 py-1.5 text-sm text-white transition-all duration-300 hover:bg-white/10`}
                                  onClick={() =>
                                    setCurrentCategoryFilter(
                                      filter as EventCategory | AllCategory,
                                    )
                                  }
                                >
                                  {filter
                                    .replace("_", " ")
                                    .toLowerCase()
                                    .replace(/\b\w/g, (char) =>
                                      char.toUpperCase(),
                                    )}
                                </button>
                              </Menu.Item>
                            );
                          });
                        })}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div
                data-scroll
                className="flex w-full flex-nowrap items-center gap-2 text-xl md:flex-nowrap justify-center md:-ml-10 md:-mt-[7.2%]"
              >
                {/* Center Buttons (Rulebook & Schedule) */}
                <div className="flex flex-nowrap items-center justify-between gap-2 md:gap-14 md:flex-nowrap">
                  <a
                    href="https://drive.google.com/file/d/12f0EmP3QEQSmIuLVgb8gk13QPHeicZ5N/"
                    target="_blank"
                    download
                  >
                    <button className="inline-flex h-[40px] min-w-0 w-auto items-center justify-center gap-2 whitespace-nowrap rounded-full border border-primary-200/80 bg-black/30 px-4 py-2 text-sm text-white md:text-lg">
                      Rule Book
                    </button>
                  </a>
                  <a
                    href="https://drive.google.com/file/d/1KF0Y-z0_bDHQBj6JfQcvZ5H2ezgQ9_wq/view?usp=sharing"
                    target="_blank"
                    download
                  >
                    <button className="inline-flex h-[40px] min-w-0 w-auto items-center justify-center gap-2 whitespace-nowrap rounded-full border border-primary-200/80 bg-black/30 px-4 py-2 text-sm text-white md:text-lg">
                      Schedule
                    </button>
                  </a>
                </div>
              </div>
            </div>

            <div
              data-scroll-section
              data-scroll-speed="0.7"
              className={
                filteredEvents.length > 0
                  ? `mx-auto grid h-full w-full max-w-7xl grid-cols-1 mb-20 justify-center gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
                  : "flex h-full w-full items-center justify-center"
              }
            >
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <Event key={event.id} event={event} />
                ))
              ) : (
                <div
                  data-scroll
                  className={`flex w-full flex-col items-center justify-center gap-5 rounded-xl border border-primary-200/80 bg-black/30 p-10 text-center text-xl text-white`}
                >
                  <CiWarning size={50} />
                  No events found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { getStaticProps };
export default Page;
