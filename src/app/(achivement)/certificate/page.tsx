import Certificate from '@/components/certificate/certificate'
import InteractiveBackground from "@/components/InteractiveBackground";
export default function Page() {
  return (
    <div>
        <InteractiveBackground
          speed={1}
          density={100}
          enableMouseGlow={true}
        />
      <Certificate/>
    </div>
  )
}

