import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Shield, Target, Users, Award } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function AboutPage() {
  const buildingImageUrl = "https://images.unsplash.com/photo-1695815870617-31bef23919fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwb2ZmaWNlJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzc0ODU1MTEzfDA&ixlib=rb-4.1.0&q=80&w=1080";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          About the Cannabis Regulatory Authority
        </h1>
        <p className="text-xl text-gray-600">
          Ensuring safe, legal, and sustainable cannabis industry development in Malawi
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

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <div className="w-12 h-12 bg-[#D5EBD9] rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-[#1B4D2E]" />
            </div>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              To regulate and oversee the cannabis industry in Malawi, ensuring compliance 
              with national and international standards while promoting economic growth, 
              public health, and safety.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="w-12 h-12 bg-[#EBF4EE] rounded-lg flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-[#1B4D2E]" />
            </div>
            <CardTitle>Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              To be a world-class regulatory authority that facilitates a thriving, 
              responsible cannabis industry contributing to Malawi's sustainable development 
              and international trade competitiveness.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Core Values */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-700" />
              </div>
              <CardTitle>Integrity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We uphold the highest standards of honesty and ethical conduct in all our 
                regulatory activities and stakeholder interactions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-orange-700" />
              </div>
              <CardTitle>Transparency</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We ensure open and clear communication, making our processes accessible 
                and understandable to all stakeholders.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-[#D5EBD9] rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-[#1B4D2E]" />
              </div>
              <CardTitle>Excellence</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We strive for the highest quality in our regulatory framework, services, 
                and continuous improvement of our systems.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What We Do */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">What We Do</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#D5EBD9] rounded-full flex items-center justify-center text-[#1B4D2E] font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">License Management</h3>
                  <p className="text-gray-600">
                    Issue, renew, and manage licenses for cultivation, processing, research, 
                    transportation, export, and retail of cannabis products.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#D5EBD9] rounded-full flex items-center justify-center text-[#1B4D2E] font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Regulatory Oversight</h3>
                  <p className="text-gray-600">
                    Develop and enforce regulations governing the cannabis industry to ensure 
                    compliance with legal and safety standards.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#D5EBD9] rounded-full flex items-center justify-center text-[#1B4D2E] font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Compliance Monitoring</h3>
                  <p className="text-gray-600">
                    Conduct regular inspections and audits of licensed facilities to ensure 
                    adherence to regulations and quality standards.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#D5EBD9] rounded-full flex items-center justify-center text-[#1B4D2E] font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Industry Support</h3>
                  <p className="text-gray-600">
                    Provide guidance and support to industry stakeholders, promoting best 
                    practices and sustainable business operations.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#D5EBD9] rounded-full flex items-center justify-center text-[#1B4D2E] font-bold">
                  5
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Public Education</h3>
                  <p className="text-gray-600">
                    Educate the public about cannabis regulations, safety, and the economic 
                    benefits of a regulated industry.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Contact Information */}
      <section className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold mb-2">Headquarters</h3>
            <p className="text-gray-600">
              Cannabis Regulatory Authority<br />
              Capital City, Lilongwe<br />
              Republic of Malawi
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Get in Touch</h3>
            <p className="text-gray-600">
              Email: info@cra.gov.mw<br />
              Phone: +265 1 234 5678<br />
              Fax: +265 1 234 5679
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
