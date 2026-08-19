// Stats.tsx
const setValue ={
  price: "សិក្សាឥតគិតថ្លៃ ១០០%",
}

export default function Stats() {
  return (
    <div className="mt-10
      sm:mt-12
      lg:mt-16
      flex
      flex-wrap
      justify-center
      lg:justify-start
      gap-8
      sm:gap-12
      lg:gap-16"
    >

      <div>
        <h3 className="text-2xl sm:text-3xl font-bold text-primary-color ">
          {setValue.price}
        </h3>
      </div>

    </div>
  );
}
