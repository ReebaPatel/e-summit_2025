const SponsorBanner = () => {
  return (
    <div className="relative w-full my-12 overflow-hidden">
      {/* Title Section */}
      <div className="flex flex-col items-center justify-start h-full text-center px-4 pt-16 pb-8">
        <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 font-poppins">
          PARTNERED BY
        </h1>
      </div>

      {/* Sponsors Banner - Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 w-full text-white">
        {/* Title Sponsor */}
        <div className="flex flex-col items-center justify-between p-4 border border-white-700">
          <div className="text-xs text-center mb-2 font-semibold">
            TITLE SPONSOR
          </div>
          <div className="flex items-center justify-center h-24">
            <img
              src="/hipla.png"
              alt="Tata Logo"
              className="h-20 object-contain"
            />
          </div>
        </div>

        {/* Powered By */}
        <div className="flex flex-col items-center justify-between p-4 border border-white-700">
          <div className="text-xs text-center mb-2 font-semibold">
            POWERED BY
          </div>
          <div className="flex items-center justify-center h-24">
            <img
              src="/images.jpeg"
              alt="My11Circle Logo"
              className="h-24 object-contain"
            />
          </div>
        </div>

        {/* Co-Powered By */}
        <div className="flex flex-col items-center justify-between p-4 border border-white-700">
          <div className="text-xs text-center mb-2 font-semibold">
            CO-POWERED BY
          </div>
          <div className="flex items-center justify-center h-24">
            <img
              src="/credila.webp"
              alt="Wonder Cement Logo"
              className="h-16 object-contain"
            />
          </div>
        </div>

        {/* Associate Partner */}
        <div className="flex flex-col items-center justify-between p-4 border border-white-700">
          <div className="text-xs text-center mb-2 font-semibold">
            ASSOCIATE PARTNER
          </div>
          <div className="flex items-center justify-center h-24">
            <img
              src="/bizom.png"
              alt="CEAT Logo"
              className="h-14 object-contain"
            />
          </div>
        </div>

        {/* Incubation Partner */}
        <div className="flex flex-col items-center justify-between p-4 border border-white-700">
          <div className="text-xs text-center mb-2 font-semibold">
            INCUBATION PARTNER
          </div>
          <div className="flex items-center justify-center h-24">
            <img
              src="/ciba.jpg"
              alt="Star Sports Logo"
              className="h-20 object-contain"
            />
          </div>
        </div>

        {/* In Association With */}
        <div className="flex flex-col items-center justify-between p-4 border border-white-700">
          <div className="text-xs text-center mb-2 font-semibold">
            IN ASSOCIATION WITH
          </div>
          <div className="flex items-center justify-center h-24">
            <img
              src="/chitale.png"
              alt="Star Sports Logo"
              className="h-16 object-contain"
            />
          </div>
        </div>

        {/* Media Partner */}
        <div className="flex flex-col items-center justify-between p-4 border border-white-700">
          <div className="text-xs text-center mb-2 font-semibold">
            MEDIA PARTNER
          </div>
          <div className="flex items-center justify-center space-x-2 h-24">
            <img
              src="/dainik.png"
              alt="Dainik Logo"
              className="h-16 object-contain"
            />
            <img
              src="/startup.jpeg"
              alt="Startup Logo"
              className="h-16 object-contain"
            />
          </div>
        </div>

        {/* Energy Partner */}
        <div className="flex flex-col items-center justify-between p-4 border border-white-700">
          <div className="text-xs text-center mb-2 font-semibold">
            ENERGY & BEVERAGE PARTNER
          </div>
          <div className="flex items-center justify-center space-x-2 h-24">
            <img
              src="/cloud9.png"
              alt="Cloud9 Logo"
              className="h-16 object-contain"
            />
            <img
              src="/papel.jpeg"
              alt="Cloud9 Logo"
              className="h-16 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorBanner;
