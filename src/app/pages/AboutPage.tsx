import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Shield, Target, Users, Award } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function AboutPage() {
  const buildingImageUrl = "https://res-console.cloudinary.com/dpeudh5sr/thumbnails/transform/v1/image/upload/Y19maWxsLGhfMjAwLHdfMjAw/v1/Q0xTX2R3ZGJpcw==/template_primary";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          About the Cannabis Regulatory Authority
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed max-w-4xl">
          The Cannabis Regulatory Authority (CRA) was established to regulate the Cannabis industry
          as provided for in the Cannabis Regulation Act 2020. The Authority is mandated to license
          all activities across the Cannabis value chain such as cultivation, processing, distribution,
          storage, exportation, importation, research, laboratory tests, transportation and medical use
          of Cannabis. The Cannabis Regulation Act 2020 promotes production of Cannabis only for
          medicinal, industrial and scientific use and does not in any manner advocate, authorize,
          promote or legally or socially accept the use of cannabis for recreational uses.
        </p>
      </div>

      {/* Hero Image */}
      <div className="mb-12 rounded-lg overflow-hidden shadow-lg">
        <ImageWithFallback 
          src={buildingImageUrl}
          alt="CRA Office" 
          className="w-full h-96 object-cover"
        />
      </div>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <div className="w-12 h-12 bg-[#EBF4EE] rounded-lg flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-[#1B4D2E]" />
            </div>
            <CardTitle>Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              A responsive and efficient regulator of the cannabis industry.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="w-12 h-12 bg-[#D5EBD9] rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-[#1B4D2E]" />
            </div>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              To provide quality, efficient and effective regulatory services in the cannabis
              industry that sustainably meet environmental and socioeconomic needs for all.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Objectives */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Strategic Objectives</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="text-gray-600 mb-6">
              In the medium-term, CRA aims to achieve the following key strategic objectives:
            </p>
            <div className="space-y-4">
              {[
                'To enforce standards and compliance in the management of cannabis and its products;',
                'To provide and facilitate marketing, publicity, and communication',
              ].map((obj, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#D5EBD9] rounded-full flex items-center justify-center text-[#1B4D2E] font-bold">
                    {i + 1}
                  </div>
                  <p className="text-gray-600 pt-1">{obj}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Core Values */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Core Values</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: 'Integrity',       icon: Shield,  bg: '#D5EBD9', color: '#1B4D2E' },
                { label: 'Transparency',    icon: Users,   bg: '#F5EDD6', color: '#A8892A' },
                { label: 'Accountability',  icon: Target,  bg: '#EBF4EE', color: '#1B4D2E' },
                { label: 'Professionalism', icon: Award,   bg: '#D5EBD9', color: '#1B4D2E' },
                { label: 'Innovation',      icon: Shield,  bg: '#F5EDD6', color: '#A8892A' },
              ].map(({ label, icon: Icon, bg, color }) => (
                <div key={label} className="flex items-center gap-3 p-4 rounded-xl border border-gray-100" style={{ backgroundColor: bg + '55' }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: bg }}>
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  <span className="font-semibold text-gray-800">{label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Core Functions */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Core Functions</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {[
                'Registration and Licensing Services',
                'Inspection and Enforcement Services',
                'Promotion of Research and Extension Services on Cannabis',
                'Information, Knowledge and Communication Management',
              ].map((fn, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#D5EBD9] rounded-full flex items-center justify-center text-[#1B4D2E] font-bold">
                    {i + 1}
                  </div>
                  <p className="text-gray-700 font-medium pt-1">{fn}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Contact Information */}
      <section className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {/* <h3 className="font-bold mb-2">Headquarters</h3> */}
            <p className="text-gray-600">
              Enquiries: +265 983 436 246<br />
              Toll-Free Line: 4335<br />
              Email: info@cra.mw<br/>
              Website: www.cra.mw<br/>
            </p>
          </div>
          {/* <div>
            { <h3 className="font-bold mb-2">Get in Touch</h3> }
            <p className="text-gray-600">
              Email: info@cra.gov.mw<br />
              Phone: +265 1 234 5678<br />
              Fax: +265 1 234 5679
            </p>
          </div> */}
        </div>
      </section>
    </div>
  );
}
