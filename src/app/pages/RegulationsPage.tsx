import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Download, BookOpen, FileText, Scale } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function RegulationsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Regulations & Guidelines
        </h1>
        <p className="text-xl text-gray-600">
          Comprehensive regulatory framework governing cannabis activities in Malawi
        </p>
      </div>

      {/* Key Documents */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Documents</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 bg-[#D5EBD9] rounded-lg flex items-center justify-center mb-4">
                <Scale className="w-6 h-6 text-[#1B4D2E]" />
              </div>
              <CardTitle>Cannabis Act 2025</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Primary legislation governing cannabis regulation in Malawi
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-blue-700" />
              </div>
              <CardTitle>Licensing Regulations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Detailed requirements and procedures for all license types
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-purple-700" />
              </div>
              <CardTitle>Compliance Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Best practices and compliance requirements for license holders
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Regulations FAQ */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <Card>
          <CardContent className="pt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Who can apply for a cannabis license in Malawi?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600">
                    Both Malawian citizens and foreign investors can apply for cannabis licenses. 
                    Applicants must be 18 years or older, have a registered business entity in Malawi, 
                    meet all financial requirements and pass background checks. Foreign applicants 
                    may be subject to additional requirements including local partnership provisions.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>What are the security requirements for cannabis facilities?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600">
                    All cannabis facilities must implement comprehensive security measures including: 
                    24/7 video surveillance with 90-day retention, intrusion detection systems, 
                    secure access control, adequate lighting, perimeter fencing for outdoor facilities 
                    and alarm systems monitored by licensed security companies. Regular security audits 
                    are required.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>How long does the licensing process take?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600">
                    Processing times vary by license type: Research licenses typically take 3-4 weeks, 
                    Cultivation and Retail licenses 4-6 weeks, Processing licenses 6-8 weeks and 
                    Export licenses 8-10 weeks. These are estimates assuming complete applications. 
                    Incomplete applications will experience delays.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>What quality standards must cannabis products meet?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600">
                    All cannabis products must meet strict quality standards including testing for 
                    potency, contaminants (pesticides, heavy metals, microbiological) and proper 
                    labeling with cannabinoid content, batch numbers and expiry dates. Processing 
                    facilities must comply with Good Manufacturing Practices (GMP). Third-party 
                    laboratory testing is mandatory.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Are there restrictions on cannabis advertising?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600">
                    Yes, cannabis advertising is strictly regulated. Advertisements cannot target 
                    minors, make health claims without scientific evidence, or use imagery that 
                    glamorizes consumption. All advertising must include health warnings and be 
                    approved by the CRA before publication. Advertising is prohibited on television, 
                    radio and near schools.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>What are the environmental regulations for cultivation?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600">
                    Cultivation operations must conduct Environmental Impact Assessments (EIA), 
                    implement water conservation measures, use approved pesticides sparingly, 
                    manage waste properly, prevent soil degradation and protect local ecosystems. 
                    Indoor facilities must meet energy efficiency standards. Regular environmental 
                    compliance audits are conducted.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger>How often must licenses be renewed?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600">
                    All cannabis licenses must be renewed annually. License holders should submit 
                    renewal applications at least 60 days before the expiry date. Renewal requires 
                    demonstrating continued compliance, updated documentation, payment of renewal 
                    fees and may involve facility re-inspection. Late renewals may incur penalties.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger>What happens if I violate regulations?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600">
                    Violations can result in warnings, fines, license suspension, or license revocation 
                    depending on severity. Minor infractions receive warnings with correction deadlines. 
                    Serious violations (safety breaches, diversion to illegal markets, fraudulent 
                    documentation) can result in immediate license suspension and criminal prosecution. 
                    All violations are documented and affect renewal decisions.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </section>

      {/* Contact for More Information */}
      <Card className="bg-[#EBF4EE] border-[#AACFB5]">
        <CardHeader>
          <CardTitle>Need More Information?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            If you have questions about regulations not covered here, please contact our 
            regulatory affairs department:
          </p>
          <div className="space-y-2 text-gray-700">
            <p><strong>Email:</strong> <a href="mailto:info@cra.mw" className="text-[#1B4D2E] hover:underline">info@cra.mw</a></p>
            <p><strong>Mobile/Whatsapp:</strong> <a href="tel:+265983436246" className="text-[#1B4D2E] hover:underline">+265983436246</a></p>
            <p><strong>Operating Hours:</strong> Monday-Friday: 7:30AM to 16:30PM</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
