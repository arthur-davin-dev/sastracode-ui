import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-primary-color dark:text-slate-300">
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-12 md:py-16">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-primary-color dark:text-slate-300 hover:text-secondary-color dark:hover:text-blue-400 transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          ត្រឡប់ទៅទំព័រដើម
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/40">
              <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>

            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              ឯកជនភាព
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-primary-color dark:text-white">
            គោលការណ៍ឯកជនភាព
          </h1>

          <p className="mt-4 text-base text-slate-500 dark:text-slate-400">
            បច្ចុប្បន្នភាពចុងក្រោយ៖ ថ្ងៃទី ១២ ខែសីហា ឆ្នាំ ២០២៦
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 leading-8">
          <section>
            <h2 className="text-2xl font-bold text-primary-color dark:text-white mb-4">
              ១. សេចក្តីផ្តើម
            </h2>

            <p>
              សូមស្វាគមន៍មកកាន់ SastraCode។ យើងខ្ញុំគោរពឯកជនភាពរបស់អ្នក និងប្តេជ្ញាចិត្តក្នុងការការពារព័ត៌មានដែលអ្នកបានផ្តល់ឱ្យ នៅពេលប្រើប្រាស់គេហទំព័រ និងសេវាកម្មអប់រំរបស់យើង។
            </p>

            <p className="mt-4">
              គោលការណ៍ឯកជនភាពនេះពន្យល់អំពីប្រភេទព័ត៌មានដែលយើងអាចប្រមូល របៀបដែលយើងប្រើប្រាស់វា និងរបៀបដែលយើងការពារវានៅពេលអ្នកប្រើប្រាស់ SastraCode។
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-color dark:text-white mb-4">
              ២. ព័ត៌មានដែលយើងប្រមូល
            </h2>

            <p>
              អាស្រ័យលើរបៀបដែលអ្នកប្រើប្រាស់ SastraCode យើងអាចប្រមូលព័ត៌មានដូចជា ឈ្មោះ អ៊ីមែល ព័ត៌មានគណនី សកម្មភាពសិក្សា និងព័ត៌មានផ្សេងទៀតដែលអ្នកបានផ្តល់ឱ្យដោយស្ម័គ្រចិត្ត។
            </p>

            <p className="mt-4">
              យើងក៏អាចប្រមូលព័ត៌មានបច្ចេកទេសមូលដ្ឋានផងដែរ ដូចជា ប្រភេទកម្មវិធីរុករក (Browser) ប្រភេទឧបករណ៍ អាសយដ្ឋាន IP និងព័ត៌មាននៃការប្រើប្រាស់ ដើម្បីជួយយើងក្នុងការថែរក្សា និងកែលម្អប្រព័ន្ធឱ្យកាន់តែប្រសើរឡើង។
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-color dark:text-white mb-4">
              ៣. របៀបដែលយើងប្រើប្រាស់ព័ត៌មានរបស់អ្នក
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>ដើម្បីផ្តល់ និងថែរក្សាសេវាកម្មអប់រំរបស់យើង។</li>
              <li>ដើម្បីបង្កើត និងគ្រប់គ្រងគណនីរបស់អ្នកប្រើប្រាស់។</li>
              <li>ដើម្បីផ្តល់មាតិកាសិក្សា និងមុខងារផ្សេងៗ។</li>
              <li>ដើម្បីកែលម្អគេហទំព័រ និងបទពិសោធន៍របស់អ្នកប្រើប្រាស់។</li>
              <li>ដើម្បីទាក់ទងជាមួយអ្នកប្រើប្រាស់នៅពេលចាំបាច់។</li>
              <li>ដើម្បីការពារសុវត្ថិភាព និងភាពត្រឹមត្រូវនៃប្រព័ន្ធរបស់យើង។</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-color dark:text-white mb-4">
              ៤. ការចែករំលែកព័ត៌មាន
            </h2>

            <p>
              យើងមិនលក់ព័ត៌មានផ្ទាល់ខ្លួនរបស់អ្នកដាច់ខាត។ យើងអាចចែករំលែកព័ត៌មានជាមួយដៃគូផ្តល់សេវាកម្មដែលគួរឱ្យទុកចិត្ត នៅពេលចាំបាច់ដើម្បីប្រតិបត្តិការ ថែរក្សា ឬកែលម្អ SastraCode ឬនៅពេលដែលមានការតម្រូវដោយច្បាប់ជាធរមាន។
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-color dark:text-white mb-4">
              ៥. ឃុកគី (Cookies) និងបច្ចេកវិទ្យាស្រដៀងគ្នា
            </h2>

            <p>
              SastraCode អាចប្រើប្រាស់ឃុកគី (Cookies) ឬបច្ចេកវិទ្យាស្រដៀងគ្នា ដើម្បីចងចាំការកំណត់របស់អ្នក រក្សាសេសសិន (Session) យល់ដឹងពីរបៀបដែលអ្នកប្រើប្រាស់ប្រព័ន្ធ និងកែលម្អសេវាកម្មរបស់យើង។
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-color dark:text-white mb-4">
              ៦. សុវត្ថិភាពទិន្នន័យ
            </h2>

            <p>
              យើងអនុវត្តវិធានការសមស្របដើម្បីការពារព័ត៌មានពីការចូលប្រើប្រាស់ ការផ្លាស់ប្តូរ ការកែប្រែ ឬការបំផ្លាញដោយគ្មានការអនុញ្ញាត។ ទោះជាយ៉ាងណាក៏ដោយ គ្មានសេវាកម្មលើអ៊ីនធឺណិតណាមួយអាចធានាសុវត្ថិភាពបាន ១០០% នោះទេ។
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-color dark:text-white mb-4">
              ៧. សិទ្ធិរបស់អ្នក
            </h2>

            <p>
              ផ្អែកលើច្បាប់ជាធរមាន អ្នកអាចមានសិទ្ធិក្នុងការចូលមើល កែប្រែ ធ្វើបច្ចុប្បន្នភាព ឬស្នើសុំលុបព័ត៌មានផ្ទាល់ខ្លួនមួយចំនួន។ អ្នកអាចទាក់ទងមកយើងបាន ប្រសិនបើអ្នកមានសំណួរអំពីព័ត៌មានរបស់អ្នក។
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-color dark:text-white mb-4">
              ៨. ការផ្លាស់ប្តូរលើគោលការណ៍នេះ
            </h2>

            <p>
              យើងអាចធ្វើបច្ចុប្បន្នភាពគោលការណ៍ឯកជនភាពនេះពីពេលមួយទៅពេលមួយ។ នៅពេលដែលមានការផ្លាស់ប្តូរ យើងនឹងធ្វើបច្ចុប្បន្នភាពកាលបរិច្ឆេទដែលបង្ហាញនៅផ្នែកខាងលើនៃទំព័រនេះ។
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-color dark:text-white mb-4">
              ៩. ទំនាក់ទំនងយើងខ្ញុំ
            </h2>

            <p>
              ប្រសិនបើអ្នកមានសំណួរផ្សេងៗអំពីគោលការណ៍ឯកជនភាពនេះ សូមទាក់ទងមកយើងខ្ញុំតាមរយៈ៖
            </p>

            <a
              href="mailto:sastracode.edu@gmail.com"
              className="inline-block mt-3 text-blue-600 dark:text-blue-400 hover:underline"
            >
              sastracode.edu@gmail.com
            </a>
          </section>
        </div>
      </div>
    </main>
  );
}