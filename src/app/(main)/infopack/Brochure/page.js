import Link from "next/link";
import { Brochure } from "@/sanity/lib/api";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Download, Eye, FileText, Info } from "lucide-react";
import bg from "@/assets/pexels2.jpg";

export default async function BrochurePage() {
  let posts = [];
  let isLoading = true;

  try {
    posts = await Brochure();
    isLoading = false;
  } catch (error) {
    console.error("Error fetching PDFs:", error);
    isLoading = false;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8"style={{
            backgroundImage: `url(${bg.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}>
      <meta name="robots" content="noindex, nofollow"/>
<link rel="canonical" href="https://www.dholeratimes.com/infopack/Brochure" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
            <h1 className="mt-6 text-4xl font-extrabold text-gray-800 sm:text-5xl tracking-tight">
              Project <span className="text-[#d8b66d] relative inline-block">Brochures</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Loading brochures...
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {[1, 2].map((i) => (
              <div 
                key={i} 
                className="bg-white rounded-xl shadow-lg overflow-hidden mb-6 animate-pulse"
              >
                <div className="p-6 flex flex-col gap-4">
                  <div className="h-10 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  
                  <div className="mt-4 flex flex-col sm:flex-row gap-3">
                    <div className="h-12 bg-gray-200 rounded-lg w-full sm:w-1/2"></div>
                    <div className="h-12 bg-gray-200 rounded-lg w-full sm:w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex items-center justify-center px-4 py-16">
        <div className="max-w-md text-center bg-white p-10 rounded-xl shadow-xl">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Info className="h-10 w-10 text-amber-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            No Brochures Available
          </h1>
          <p className="text-gray-600 mb-8">
            We couldn't find any brochures at the moment. Please check back later or contact our team for assistance.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#bc9849] to-[#d8b66d] text-white rounded-lg shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[87vh] bg-gradient-to-b from-blue-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8 relative"style={{
          backgroundImage: `url(${bg.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}>
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 -z-10"
        style={{ backgroundImage: `url(${bg.src})` }}
      ></div>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          
          <p className="font-semibold text-lg max-w-2xl mx-auto leading-relaxed">
            Learn all about our Dholera residential plots by accessing our comprehensive project brochures.
          </p>
        </div>

        {/* List View Container */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden max-w-4xl mx-auto border border-gray-100">
          {posts.map((post, index) => (
            <div 
              key={post._id} 
              className={`border-b last:border-b-0 border-gray-200 ${index % 2 === 0 ? 'bg-white/70' : 'bg-gray-50/70'}`}
            >
              <div className="p-8 flex flex-col gap-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mr-4">
                    <FileText className="h-6 w-6" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    {post.title}
                  </h2>
                </div>
                
                {/* Content Section */}
                <div className="ml-16">
                  {post.pdfUrl && (
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        href={post.pdfUrl}
                        download
                        className="inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-[#bc9849] to-[#d8b66d] text-white rounded-lg shadow hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex-1 text-center"
                      >
                        <Download className="mr-2" size={20} />
                        Download Brochure
                      </Link>

                      <Link
                        href={post.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex-1 text-center"
                      >
                        <Eye className="mr-2" size={20} />
                        View Brochure
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer decoration */}
        <div className="mt-16 text-center">
          <div className="inline-block w-16 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          <p className="mt-4 text-sm text-gray-500">
            Find all the information you need about Dholera Smart City
          </p>
        </div>
      </div>
    </div>
  );
}
