import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export default function TermsOfServicePage() {
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
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>

            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              លក្ខខណ្ឌ
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-primary-color dark:text-white">
            លក្ខខណ្ឌប្រើប្រាស់សេវាកម្ម
          </h1>

          <p className="mt-4 text-base text-slate-500 dark:text-slate-400">
            បច្ចុប្បន្នភាពចុងក្រោយ៖ ថ្ងៃទី ១២ ខែសីហា ឆ្នាំ ២០២៦
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 leading-8">
          <section>
            <h2 className="text-2xl font-bold text-primary-color dark:text-white mb-4">
              ១. ការយល់ព្រមលើលក្ខខណ្ឌ
            </h2>

            <p>
              ដោយការចូលប្រើប្រាស់ ឬប្រើប្រាស់ SastraCode អ្នកយល់ព្រមអនុវត្តតាមលក្ខខណ្ឌប្រើប្រាស់សេវាកម្មទាំងនេះ។ ប្រសិនបើអ្នកមិនយល់ព្រមតាមលក្ខខណ្ឌទាំងនេះទេ សូមកុំប្រើប្រាស់ប្រព័ន្ធនេះ។
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-color dark:text-white mb-4">
              ២. អំពី SastraCode
            </h2>

            <p>
              SastraCode គឺជាប្រព័ន្ធអប់រំដែលត្រូវបានបង្កើតឡើងដើម្បីជួយអ្នកប្រើប្រាស់ក្នុងការរៀនសរសេរកូដ និងបច្ចេកវិទ្យា តាមរយៈមេរៀន ឯកសារយោង លំហាត់អនុវត្ត និងប្រភពធនធានសិក្សាផ្សេងៗទៀត។
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-color dark:text-white mb-4">
              ៣. គណនីអ្នកប្រើប្រាស់
            </h2>

            <p>
              មុខងារមួយចំនួនតម្រូវឱ្យអ្នកបង្កើតគណនី។ អ្នកមានការទទួលខុសត្រូវក្នុងការផ្តល់ព័ត៌មានឱ្យបានត្រឹមត្រូវ និងរក្សាសុវត្ថិភាពនៃព័ត៌មានសម្ងាត់គណនីរបស់អ្នក។
            </p>

            <p className="mt-4">
              អ្នកត្រូវទទួលខុសត្រូវចំពោះសកម្មភាពទាំងអស់ដែលបានអនុវត្តតាមរយៈគណនីរបស់អ្នក ហើយត្រូវជូនដំណឹងមកយើងខ្ញុំជាបន្ទាន់ ប្រសិនបើអ្នកជឿជាក់ថាគណនីរបស់អ្នកត្រូវគេចូលប្រើប្រាស់ដោយគ្មានការអនុញ្ញាត។
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-color dark:text-white mb-4">
              ៤. ការប្រើប្រាស់ដែលសមស្រប
            </h2>

            <p>អ្នកយល់ព្រមមិនប្រើប្រាស់ SastraCode ដើម្បី៖</p>

            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>បំផ្លាញ ឬព្យាយាមបំផ្លាញប្រព័ន្ធសុវត្ថិភាពនៃប្រព័ន្ធនេះ។</li>
              <li>រំខានដល់ប្រតិបត្តិការទូទៅនៃគេហទំព័រ។</li>
              <li>បញ្ជូន ឬផ្ទុកឡើងនូវកម្មវិធីដែលមានមេរោគ ឬមាតិកាដែលបង្កគ្រោះថ្នាក់។</li>
              <li>ប្រើប្រាស់មុខងាររបស់ប្រព័ន្ធក្នុងផ្លូវខុស ឬបំពានលើប្រព័ន្ធ។</li>
              <li>ចម្លង ឬចែករំលែកមាតិកាដែលការពារដោយរក្សាសិទ្ធិដោយគ្មានការអនុញ្ញាត។</li>
              <li>ប្រើប្រាស់ប្រព័ន្ធសម្រាប់គោលបំណងខុសច្បាប់។</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-color dark:text-white mb-4">
              ៥. មាតិកាអប់រំ
            </h2>

            <p>
              SastraCode ផ្តល់ជូននូវមាតិកាអប់រំសម្រាប់គោលបំណងសិក្សា។ ទោះបីជាយើងខិតខំប្រឹងប្រែងផ្តល់នូវព័ត៌មានដែលមានប្រយោជន៍ និងត្រឹមត្រូវយ៉ាងណាក៏ដោយ យើងមិនធានាថារាល់មេរៀន ឧទាហរណ៍ ឬព័ត៌មានទាំងអស់នឹងមានភាពពេញលេញ ទាន់សម័យ ឬគ្មានកំហុសឆ្គងនោះឡើយ។
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-color dark:text-white mb-4">
              ៦. កម្មសិទ្ធិបញ្ញា
            </h2>

            <p>
              លើកលែងតែមានការបញ្ជាក់ផ្សេងពីនេះ គេហទំព័រ ម៉ាកសញ្ញា មាតិកាដើម ការរចនា រូបភាព និងកម្មវិធីរបស់ SastraCode ត្រូវបានការពារដោយច្បាប់ស្តីពីកម្មសិទ្ធិបញ្ញាជាធរមាន។
            </p>

            <p className="mt-4">
              អ្នកអាចប្រើប្រាស់ធនធានអប់រំសម្រាប់គោលបំណងសិក្សាផ្ទាល់ខ្លួនបាន ប៉ុន្តែអ្នកមិនត្រូវធ្វើការចម្លង ចែករំលែកបន្ត ឬយកមាតិកាដែលបានការពារទៅប្រកបអាជីវកម្មដោយគ្មានការអនុញ្ញាតឡើយ។
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-color dark:text-white mb-4">
              ៧. សេវាកម្មភាគីទីបី
            </h2>

            <p>
              SastraCode អាចភ្ជាប់ ឬបញ្ចូលសេវាកម្មភាគីទីបី។ សេវាកម្មភាគីទីបីត្រូវបានគ្រប់គ្រងដោយលក្ខខណ្ឌ និងគោលការណ៍ផ្ទាល់ខ្លួនរបស់ពួកគេ ហើយ SastraCode មិនទទួលខុសត្រូវចំពោះការអនុវត្តរបស់ពួកគេឡើយ។
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-color dark:text-white mb-4">
              ៨. ភាពអាចរកបាននៃសេវាកម្ម
            </h2>

            <p>
              យើងខ្ញុំអាចកែប្រែ ផ្អាក ឬបញ្ឈប់ផ្នែកណាមួយនៃប្រព័ន្ធនៅពេលណាក៏បាន។ យើងខ្ញុំនឹងប្រឹងប្រែងឱ្យអស់ពីសមត្ថភាពដើម្បីរក្សាសេវាកម្មឱ្យដំណើរកើតឡើង ប៉ុន្តែមិនអាចធានាថាការប្រើប្រាស់នឹងមិនមានការរំខានទាល់តែសោះនោះឡើយ។
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-color dark:text-white mb-4">
              ៩. ការកម្រិតទទួលខុសត្រូវ
            </h2>

            <p>
              ក្នុងកម្រិតដែលអនុញ្ញាតដោយច្បាប់ជាធរមាន SastraCode នឹងមិនទទួលខុសត្រូវចំពោះការខូចខាត ឬការបាត់បង់ដោយប្រយោល ដោយចៃដន្យ ឬផលវិបាកផ្សេងៗដែលកើតចេញពីការប្រើប្រាស់ ឬមិនអាចប្រើប្រាស់ប្រព័ន្ធនេះបានឡើយ។
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-color dark:text-white mb-4">
              ១០. ការផ្លាស់ប្តូរលើលក្ខខណ្ឌទាំងនេះ
            </h2>

            <p>
              យើងខ្ញុំអាចធ្វើបច្ចុប្បន្នភាពលក្ខខណ្ឌប្រើប្រាស់សេវាកម្មនេះពីពេលមួយទៅពេលមួយ។ ការបន្តប្រើប្រាស់ SastraCode បន្ទាប់ពីការផ្លាស់ប្តូរត្រូវបានផ្សព្វផ្សាយ មានន័យថាអ្នកយល់ព្រមទទួលយកលក្ខខណ្ឌដែលបានធ្វើបច្ចុប្បន្នភាពនោះ។
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-color dark:text-white mb-4">
              ១១. ទំនាក់ទំនង
            </h2>

            <p>
              ប្រសិនបើអ្នកមានសំណួរផ្សេងៗទាក់ទងនឹងលក្ខខណ្ឌប្រើប្រាស់សេវាកម្មនេះ សូមទាក់ទងមកយើងខ្ញុំតាមរយៈ៖
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