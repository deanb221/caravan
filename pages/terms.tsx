export default function TermsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="section-padding bg-gradient-to-br from-primary-600 to-secondary-700 text-white">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Terms & Conditions</h1>
          <p className="text-xl text-primary-100 font-medium tracking-tight">
            Important information about booking and hiring our touring caravans
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Booking & Damage Deposit */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6 tracking-tight">Booking & Damage Deposit</h2>
              <div className="space-y-4 text-gray-700 font-medium leading-relaxed">
                <p>
                  All touring caravan hires are subject to a booking and damage deposit of £250. This deposit is payable 
                  once per caravan hire (not per booking period) and serves as a booking deposit when you make your reservation.
                </p>
                <p>
                  Once your hire period begins, this deposit then acts as a damage deposit. The full amount is fully refundable 
                  shortly after the end of your hire, provided the touring caravan and all contents are returned clean, undamaged, 
                  and on time as agreed.
                </p>
                <p>
                  In the event that the touring caravan sustains damage during your hire period, the repair cost will be deducted 
                  from this deposit, up to a maximum cost to the hirer of the insurance excess of £250. For accidental damage, 
                  any costs exceeding this insurance excess will be covered by NI Caravan Hire or our insurance company.
                </p>
                <div className="bg-primary-50 border-l-4 border-primary-600 p-4 mt-6 rounded-r-lg">
                  <p className="text-primary-900 font-semibold">
                    The deposit is fully refundable provided the caravan is returned in the same condition as when collected.
                  </p>
                </div>
              </div>
            </div>

            {/* Hire Periods & Collection Times */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6 tracking-tight">Hire Periods & Collection Times</h2>
              <div className="space-y-4 text-gray-700 font-medium leading-relaxed">
                <p>
                  Our standard hire periods are designed to make your touring adventure as convenient as possible:
                </p>
                
                <div className="bg-gray-50 rounded-xl p-6 mt-4 mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">Weekend Bookings</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>Collection:</strong> Friday 3:00 PM - 4:00 PM</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>Return:</strong> Monday 10:00 AM - 12:00 PM (Noon)</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>Duration:</strong> 3 nights (Friday to Monday)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">Weekly Bookings</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>Collection:</strong> Friday 3:00 PM - 4:00 PM</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>Return:</strong> Friday 10:00 AM - 12:00 PM (Noon)</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>Duration:</strong> 7 nights (Friday to Friday)</span>
                    </li>
                  </ul>
                </div>

                <p>
                  If you require different collection or return times, or wish to arrange a hire period that differs from our 
                  standard weekend or weekly options, please contact us directly. We'll do our best to accommodate your needs 
                  where possible.
                </p>
              </div>
            </div>

            {/* Collection Process */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6 tracking-tight">Collect Your Caravan</h2>
              <div className="space-y-4 text-gray-700 font-medium leading-relaxed">
                <p>
                  On the day of collection, please arrive at our collection site at the time specified on your confirmation 
                  unless an alternative time has subsequently been mutually agreed. Please allow for up to one hour to be 
                  spent with us during the collection process.
                </p>
                
                <div className="bg-gray-50 rounded-xl p-6 mt-6 mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">Required Documentation</h3>
                  <p className="mb-4 text-gray-700">
                    You will need to produce the following original documentation on collection:
                  </p>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span><strong>Full driving licence</strong> plus DVLA licence check code showing your current residential address</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span><strong>Motor insurance certificate</strong> for your tow car</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span><strong>Proof of address</strong>, such as utility bill or bank statement, dated within the past three months</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>If you need a rear number plate, we require documentation as laid down by government legislation</span>
                    </li>
                  </ul>
                </div>

                <p>
                  You will then be shown around your touring caravan by a member of our team so you are fully aware of how 
                  the equipment operates. This demonstration can be tailored to your needs, so do not worry if you are either 
                  an experienced caravanner or if this is the first time you have ever towed or used a caravan.
                </p>

                <div className="bg-primary-50 border-l-4 border-primary-600 p-4 mt-6 rounded-r-lg">
                  <p className="text-primary-900 font-semibold">
                    Our team will ensure you feel confident and comfortable with your touring caravan before you set off on your adventure.
                  </p>
                </div>
              </div>
            </div>

            {/* Travel Restrictions */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6 tracking-tight">Travel Restrictions</h2>
              <div className="space-y-4 text-gray-700 font-medium leading-relaxed">
                <p>
                  Our touring caravans are available for hire within the United Kingdom only. This includes England, Scotland, 
                  Wales, and Northern Ireland.
                </p>
                <p>
                  We regret that we cannot assist with hires travelling outside of the UK, and taking our touring caravans 
                  outside of England, Scotland, Wales, and Northern Ireland is prohibited under the terms of hire.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mt-6 rounded-r-lg">
                  <p className="text-blue-900 font-semibold">
                    Our touring caravans are fully insured for use throughout the UK, allowing you to explore all of Northern 
                    Ireland and beyond with confidence.
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Terms */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6 tracking-tight">Additional Terms</h2>
              <div className="space-y-6 text-gray-700 font-medium leading-relaxed">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">Insurance & Liability</h3>
                  <p>
                    All our touring caravans are fully insured. The hirer is responsible for the first £250 of any damage 
                    (the insurance excess), as covered by the damage deposit. Any damage exceeding this amount is covered 
                    by our insurance policy.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">Cleaning & Condition</h3>
                  <p>
                    The touring caravan must be returned in the same clean condition as when collected. A cleaning fee may 
                    be deducted from the deposit if the caravan requires excessive cleaning beyond normal wear and tear.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">Late Returns</h3>
                  <p>
                    Late returns may result in additional charges. Please ensure you return the caravan by the agreed time 
                    to avoid any penalties.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">Cancellation Policy</h3>
                  <p>
                    Cancellation terms will be confirmed at the time of booking. We recommend booking with confidence, 
                    knowing that our flexible policies are designed to accommodate your needs.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact for Questions */}
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 md:p-12 border-2 border-primary-200">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-4 tracking-tight">Questions About Our Terms?</h2>
              <p className="text-gray-700 font-medium mb-6">
                If you have any questions about our terms and conditions, booking deposits, or hire periods, please don't 
                hesitate to contact us. We're here to help make your touring adventure as smooth as possible.
              </p>
              <a href="/contact" className="btn-primary inline-block">
                Contact Us →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}





