import { PinContainer } from "@/components/ui/3d-pin";

export default function AnimatedPinDemo({ title, href, img }) {
  return (
    <div className="h-[24rem] flex items-center justify-center">
      <PinContainer title={title} href={href}>
        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
          <img src={img} alt={title} className="rounded-xl w-full h-full" />
        </div>
      </PinContainer>
    </div>
  );
}
