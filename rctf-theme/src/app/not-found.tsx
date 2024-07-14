import Logo404 from "@/components/Logo404";

export default function Error() {
  return (
    <div className="absolute -z-10 top-0 left-0 bottom-0 right-0 grid container mx-auto">
      <div className="place-self-center w-full md:w-1/2 xl:w-1/3 flex flex-col gap-8">
        <Logo404 />
        <p className="text-center text-xl">
          Oops! The station you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
    </div>
  )
}