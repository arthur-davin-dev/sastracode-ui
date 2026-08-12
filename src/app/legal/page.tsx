import Link from "next/link";
import { ArrowLeft, Scale } from "lucide-react";

export default function LegalPage() {
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
              <Scale className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>

            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              ផ្លូវច្បាប់
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-primary-color dark:text-white">
            ព័ត៌មានផ្លូវច្បាប់
          </h1>

          <p className="mt-4 text-base text-slate-500 dark:text-slate-400">
            បច្ចុប្បន្នភាពចុងក្រោយ៖ ថ្ងៃទី ១២ ខែសីហា ឆ្នាំ ២០២៦
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 leading-8">
          <section>
            <h2 className="text-2xl font-bold text-primary-color dark:text-white mb-4">
              ១. ព័ត៌មានទូទៅ
            </h2>

            <p>
              SastraCode គឺជាប្រព័ន្ធអប់រំដែលផ្តោតលើការបណ្តុះបណ្តាលផ្នែកសរសេរកូដ (Programming) និងបច្ចេកវិទ្យា។ ព័ត៌មានដែលបានផ្តល់ជូនតាមរយៈប្រព័ន្ធនេះ គឺមានគោលបំណងចម្បងសម្រាប់ការអប់រំ និងការចែករំលែកព័ត៌មានតែប៉ុណ្ណោះ។
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-color dark:text-white mb-4">
              ២. ការបដិសេធការទទួលខុសត្រូវផ្នែកអប់រំ
            </h2>

            <p>
              ឧទាហរណ៍នៃកូដ ឯកសារយោង មេរៀន និងសម្ភារៈសិក្សាផ្សេងទៀត អាចមានចំណុចខុសឆ្គង ឬអាចហួសសម័យនៅពេលដែលបច្ចេកវិទ្យាមានការផ្លាស់ប្តូរ។
            </p>

            <p className="mt-4">
              អ្នកប្រើប្រាស់គួរតែផ្ទៀងផ្ទាត់ដោយខ្លួនឯង លើការសម្រេចចិត្តបច្ចេកទេស វិជ្ជាជីវៈ សុវត្ថិភាព ឬការយកទៅប្រើយ៉ាងម៉ត់ចត់ មុនពេលពឹងផ្អែកលើព័ត៌មានដែលផ្តល់ដោយ SastraCode។
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-color dark:text-white mb-4">
              ៣. តំណភ្ជាប់ខាងក្រៅ
            </h2>

            <p>
              SastraCode អាចផ្តល់តំណភ្ជាប់ទៅកាន់គេហទំព័រ ឯកសារយោង បណ្ណាល័យកូដ (Libraries) ប្រព័ន្ធ ឬប្រភពផ្សេងទៀតដែលគ្រប់គ្រងដោយភាគីទីបី។ តំណភ្ជាប់ទាំងនេះត្រូវបានផ្តល់ជូនដើម្បីភាពងាយស្រួល និងជាព័ត៌មានបន្ថែមតែប៉ុណ្ណោះ។
            </p>

            <p className="mt-4">
              យើងខ្ញុំមិនគ្រប់គ្រង និងមិនទទួលខុសត្រូវចំពោះមាតិកា ភាពអាចប្រើប្រាស់បាន សុវត្ថិភាព ឬគោលការណ៍នៃគេហទំព័រខាងក្រៅទាំងនោះឡើយ។
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-color dark:text-white mb-4">
              ៤. កម្មសិទ្ធិបញ្ញា និងរក្សាសិទ្ធិ
            </h2>

            <p>
              SastraCode គោរពសិទ្ធិកម្មសិទ្ធិបញ្ញា។ ប្រសិនបើអ្នកជឿជាក់ថាមាតិកាដែលមាននៅលើប្រព័ន្ធរបស់យើងរំលោភលើសិទ្ធិអ្នកនិពន្ធ ឬសិទ្ធិកម្មសិទ្ធិបញ្ញាផ្សេងទៀតរបស់អ្នក សូមទាក់ទងមកយើងខ្ញុំជាមួយនឹងព័ត៌មានលម្អិតគ្រប់គ្រាន់ ដើម្បីបញ្ជាក់ពីមាតិកា និងសិទ្ធិដែលត្រូវបានទាមទារ។
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-color dark:text-white mb-4">
              ៥. ពាណិជ្ជសញ្ញា (Trademarks)
            </h2>

            <p>
              SastraCode និងម៉ាកសញ្ញាពាក់ព័ន្ធ ត្រូវបានប្រើប្រាស់ដើម្បីសម្គាល់ប្រព័ន្ធអប់រំរបស់យើង។ ឈ្មោះ ម៉ាកសញ្ញា រូបសញ្ញា (Logos) និងឈ្មោះផលិតផលរបស់ភាគីទីបី គឺជាកម្មសិទ្ធិរបស់ម្ចាស់រៀងៗខ្លួន។
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-color dark:text-white mb-4">
              ៦. មិនមែនជាការផ្តល់ប្រឹក្សាវិជ្ជាជីវៈ
            </h2>

            <p>
              ព័ត៌មានដែលផ្តល់ដោយ SastraCode មិនត្រូវចាត់ទុកជាការផ្តល់ប្រឹក្សាផ្លូវច្បាប់ ហិរញ្ញវត្ថុ សុវត្ថិភាព ការងារ ឬការផ្តល់ប្រឹក្សាជំនាញវិជ្ជាជីវៈផ្សេងទៀតឡើយ។
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-color dark:text-white mb-4">
              ៧. ការផ្លាស់ប្តូរព័ត៌មានផ្លូវច្បាប់
            </h2>

            <p>
              យើងខ្ញុំអាចធ្វើបច្ចុប្បន្នភាពទំព័រព័ត៌មានផ្លូវច្បាប់នេះនៅពេលចាំបាច់ ដើម្បីឆ្លុះបញ្ចាំងពីការផ្លាស់ប្តូរនៃប្រព័ន្ធ សេវាកម្ម ឬតម្រូវការច្បាប់ជាធរមាន។
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-color dark:text-white mb-4">
              ៨. ទំនាក់ទំនង
            </h2>

            <p>
              សម្រាប់សំណួរផ្លូវច្បាប់ បញ្ហារក្សាសិទ្ធិ ឬកិច្ចការផ្លូវច្បាប់ផ្សេងទៀត សូមទាក់ទងមកកាន់៖
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