import { Calendar, Clock, MapPin, Users, ArrowLeft, Timer } from "lucide-react";
import Link from "next/link";
import { eventDetails } from "@/lib/eventData";

const EventDetailPage = async ({ params }) => {
  const eventId = (await params).id;
  const event = eventDetails[eventId];
  if (!event) return null;

  const renderEventSpecificContent = () => {
    switch (event.id) {
      case "ipl-auction":
        return (
          <>
            <section className="space-y-6">
              <h2 className="text-2xl font-bold">Event Format</h2>
              <div className="grid gap-4">
                {event.format.map((item, index) => (
                  <div key={index} className="bg-gray-800/30 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-orange-400 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-300">{item.content}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="space-y-6">
              <h2 className="text-2xl font-bold">Rules</h2>
              <ul className="space-y-4">
                {event.rules.map((rule, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <span className="text-orange-400 font-bold">•</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </section>
          </>
        );

      case "deal-and-disrupt":
        return (
          <>
            <section className="space-y-6">
              <h2 className="text-2xl font-bold">Event Format</h2>
              <div className="grid gap-4">
                {event.format.map((item, index) => (
                  <div key={index} className="bg-gray-800/30 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-400 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-300">{item.content}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="space-y-6">
              <h2 className="text-2xl font-bold">Challenges</h2>
              <div className="grid gap-4">
                {event.challenges.map((challenge, index) => (
                  <div key={index} className="bg-gray-800/30 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-400 mb-2">
                      {challenge.title}
                    </h3>
                    <p className="text-gray-300">{challenge.content}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="space-y-6">
              <h2 className="text-2xl font-bold">Winning Criteria</h2>
              <ul className="space-y-4">
                {event.winningCriteria.map((criteria, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <span className="text-blue-400 font-bold">•</span>
                    {criteria}
                  </li>
                ))}
              </ul>
            </section>
          </>
        );

      case "entrepreneurial-escape-room":
        return (
          <>
            <section className="space-y-6">
              <h2 className="text-2xl font-bold">Event Format</h2>
              <div className="grid gap-4">
                {event.format.map((item, index) => (
                  <div key={index} className="bg-gray-800/30 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-400 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-300">{item.content}</p>
                  </div>
                ))}
              </div>
            </section>
            {event.duration && (
              <section className="space-y-6">
                <div className="flex items-center gap-3 bg-gray-800/30 p-6 rounded-lg">
                  <Timer className="text-green-400" size={24} />
                  <div>
                    <h3 className="text-lg font-semibold">Duration</h3>
                    <p className="text-gray-300">{event.duration}</p>
                  </div>
                </div>
              </section>
            )}
          </>
        );

      case "mun":
        return (
          <>
            <section className="space-y-6">
              <h2 className="text-2xl font-bold">Instructions</h2>
              <div className="grid gap-4">
                {event.instructions.map((instruction, index) => (
                  <div key={index} className="bg-gray-800/30 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-yellow-400 mb-2">
                      {instruction.title}
                    </h3>
                    <p className="text-gray-300">{instruction.content}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="space-y-6">
              <h2 className="text-2xl font-bold">Judging Criteria</h2>
              <div className="grid gap-4">
                {event.judgingCriteria.map((criteria, index) => (
                  <div key={index} className="bg-gray-800/30 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-yellow-400 mb-2">
                      {criteria.title}
                    </h3>
                    <p className="text-gray-300">{criteria.content}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        );

      case "reboot-and-revive":
        return (
          <>
            <section className="space-y-6">
              <h2 className="text-2xl font-bold">Event Format</h2>
              <div className="grid gap-4">
                {event.format.map((item, index) => (
                  <div key={index} className="bg-gray-800/30 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-pink-400 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-300">{item.content}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        );

      case "hack-a-business":
        return (
          <>
            <section className="space-y-6">
              <h2 className="text-2xl font-bold">
                Competition Structure & Rounds
              </h2>
              <div className="grid gap-4">
                <div className="bg-gray-800/30 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">
                    Online Rounds
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400">✅</span> Team
                      Description submission
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400">✅</span> Idea
                      Submission round
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400">✅</span> Idea Judging
                      Round
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-800/30 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">
                    Offline Rounds
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400">✅</span>{" "}
                      Entrepreneurial Knowledge Quiz
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400">✅</span> Shark
                      Tank-Style Investment & Pitch Round
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400">✅</span> Pit Solving
                      Round
                    </li>
                  </ul>
                </div>
              </div>
            </section>
            <section className="space-y-6">
              <h2 className="text-2xl font-bold">Prizes & Benefits</h2>
              <div className="bg-gray-800/30 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-400 mb-2">
                  Exciting Goodies
                </h3>
                <p className="text-gray-300">
                  Participate to win exciting goodies and prizes!
                </p>
              </div>
            </section>
          </>
        );

      case "innovex":
        return (
          <>
            <section className="space-y-6">
              <h2 className="text-2xl font-bold">Competition Structure</h2>
              <div className="grid gap-4">
                <div className="bg-gray-800/30 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-indigo-400 mb-2">
                    Idea Submission
                  </h3>
                  <p className="text-gray-300">
                    Teams submit their innovative ideas. Top 40 ideas will be
                    shortlisted for the next round.
                  </p>
                </div>
                <div className="bg-gray-800/30 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-indigo-400 mb-2">
                    Online Presentation
                  </h3>
                  <p className="text-gray-300">
                    40 teams will present their ideas online. Each team gets 15
                    minutes for the presentation. Conducted over two days with
                    five panels evaluating the teams.
                  </p>
                </div>
                <div className="bg-gray-800/30 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-indigo-400 mb-2">
                    Offline Presentation & Demo
                  </h3>
                  <p className="text-gray-300">
                    Top 20 teams will proceed to the offline round. 15-minute
                    presentation, including a live demo.
                  </p>
                </div>
                <div className="bg-gray-800/30 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-indigo-400 mb-2">
                    Idea Validation Camp
                  </h3>
                  <p className="text-gray-300">
                    Top teams will get a chance to participate in an Idea
                    Validation Camp at CIBA & MIM. 10 exclusive entries along
                    with PR opportunities.
                  </p>
                </div>
              </div>
            </section>
            <section className="space-y-6">
              <h2 className="text-2xl font-bold">Prizes & Benefits</h2>
              <div className="bg-gray-800/30 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-indigo-400 mb-2">
                  Winners & Top Performers Get
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400">✅</span> Exclusive
                    Goodies
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400">✅</span> Certificates &
                    Recognition
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400">✅</span> Networking &
                    Mentorship Opportunities
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400">✅</span> A chance to
                    pitch their idea at CIBA & MIM for further validation
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400">✅</span> Prize Pool of
                    5k+
                  </li>
                </ul>
              </div>
            </section>
            <section className="space-y-6">
              <h2 className="text-2xl font-bold">Registration</h2>
              <div className="bg-gray-800/30 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-indigo-400 mb-2">
                  Registration Fee
                </h3>
                <p className="text-gray-300">
                  ₹200 per team selected for poster presentation after Idea
                  Submission round
                </p>
              </div>
              <div className="bg-gray-800/30 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-indigo-400 mb-2">
                  Event Date
                </h3>
                <p className="text-gray-300">
                  Saturday, 7th (Tentative) for poster presentation/PPT
                  presentation round
                </p>
              </div>
            </section>
          </>
        );

      case "brandVision":
        return (
          <>
            <section className="space-y-6">
              <h2 className="text-2xl font-bold">Event Format</h2>
              <div className="grid gap-4">
                {event.format.map((item, index) => (
                  <div key={index} className="bg-gray-800/30 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-cyan-400 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-300">{item.content}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold">Judging Criteria</h2>
              <div className="grid gap-4">
                {event.judgingCriteria.map((criteria, index) => (
                  <div key={index} className="bg-gray-800/30 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-cyan-400 mb-2">
                      {criteria.title}
                    </h3>
                    <p className="text-gray-300">{criteria.content}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold">Prizes & Benefits</h2>
              <div className="bg-gray-800/30 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">
                  What You'll Win
                </h3>
                <ul className="space-y-2 text-gray-300">
                  {event.prizes.map((prize, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-cyan-400">✅</span> {prize}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </>
        );

      default:
        return null;
    }
  };

  // Get accent color based on event type
  const getAccentColor = () => {
    const colorMap = {
      "ipl-auction": "text-orange-400",
      "deal-and-disrupt": "text-blue-400",
      "escape-room": "text-green-400",
      mun: "text-yellow-400",
      "reboot-and-revive": "text-pink-400",
      "hack-business": "text-purple-400",
      "tech-venture": "text-indigo-400",
      brandVision: "text-cyan-400",
    };
    return colorMap[event.id] || "text-blue-400";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <header className="relative h-64 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            src="/hero.mp4"
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>

        {/* Gradient Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${event.gradientColors} opacity-0`}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="container mx-auto px-6 h-full flex flex-col justify-center relative z-10">
          <div className="flex justify-between items-center mb-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-white/80 hover:text-white"
            >
              <ArrowLeft size={20} />
              <span>Back to Events</span>
            </Link>

            {/* Mobile Register Button - only visible on mobile */}
            <Link
              href={event.href}
              rel="noopener noreferrer"
              className="md:hidden bg-white text-gray-900 py-2 px-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Register
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">{event.title}</h1>
          <p className="text-xl text-white/80 mt-2">{event.tagline}</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Event Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-800/50 p-6 rounded-xl">
              <div className="flex items-center gap-3">
                <MapPin className={getAccentColor()} />
                <div>
                  <p className="text-sm text-gray-400">Venue</p>
                  <p className="font-medium">{event.venue}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className={getAccentColor()} />
                <div>
                  <p className="text-sm text-gray-400">Date</p>
                  <p className="font-medium">{event.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className={getAccentColor()} />
                <div>
                  <p className="text-sm text-gray-400">Time</p>
                  <p className="font-medium">{event.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className={getAccentColor()} />
                <div>
                  <p className="text-sm text-gray-400">Team Size</p>
                  <p className="font-medium">{event.teamSize}</p>
                </div>
              </div>
              {event.registrationFee && (
                <div className="flex items-center gap-3">
                  <span className={`${getAccentColor()} font-bold text-xl`}>
                    ₹
                  </span>
                  <div>
                    <p className="text-sm text-gray-400">Entry Fee</p>
                    <p className="font-medium">{event.registrationFee}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">About the Event</h2>
              <p className="text-gray-300 leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Event Specific Content */}
            {renderEventSpecificContent()}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Registration Card */}
              <div
                className={`bg-gradient-to-r ${event.gradientColors} p-6 rounded-xl text-center`}
              >
                <h3 className="text-xl font-bold mb-4">
                  Ready to Participate?
                </h3>
                <p className="text-white/90 mb-6">
                  Join us for this exciting event and showcase your skills!
                </p>
                <Link
                  href={event.href}
                  rel="noopener noreferrer"
                  className="block w-full bg-white text-gray-900 py-3 px-6 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                  Register Now
                </Link>
              </div>

              {/* Important Notes */}
              <div className="bg-gray-800/50 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">Important Notes</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className={getAccentColor()}>•</span>
                    Bring your official ID for registration
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={getAccentColor()}>•</span>
                    Come prepared with your team
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={getAccentColor()}>•</span>
                    Review rules and guidelines beforehand
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventDetailPage;
