import { Arrow, Circle } from "@/components/Icons";
import { Link } from "next-view-transitions";

export type ArrowDirection = "nw" | "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "none" | "hidden";

interface ArrowCommonProps {
  children: React.ReactNode;
  direction: ArrowDirection;
  isActive?: boolean;
  blur?: boolean;
}

type ArrowLinkProps = React.ComponentProps<"a"> & ArrowCommonProps & {
  href: string;
}

type ArrowButtonProps = React.ComponentProps<"button"> & ArrowCommonProps;

function ArrowCommon({ children, direction, isActive, blur }: ArrowCommonProps) {
  const hidden = direction === "hidden";
  return (
    <span className={`${blur ? "bg-surface-main/50 backdrop-blur-xl" : ""} inline-flex flex-row font-bold select-none`}>
      {!hidden ? (
        <span className="grid place-content-center w-11 h-11">
          <span className={`inline-flex transition-transform motion-reduce:transition-none rotate-${direction} group-hover:scale-125 group-disabled:!scale-100 content-center text-3xl leading-none group-disabled:text-button-disabled`}>
            {direction !== "none"
              ? <Arrow />
              : <Circle />
            }
          </span>
        </span>
      ) : null}
      <span className={`transition-colors motion-reduce:transition-none ${isActive ? "bg-button-active group-hover:bg-button-activehover" : "bg-button-normal group-hover:bg-button-normalhover"} group-disabled:bg-button-disabled group-disabled:text-button-textdisabled text-white px-1 pb-2 content-center text-4xl leading-none`}>
        {children}
      </span>
    </span>
  );
}

export function ArrowLink({ children, href, direction, isActive, blur, ...props }: ArrowLinkProps) {
  return (
    <Link href={href} className="group inline-flex w-fit focus-visible:ring-offset-4" {...props}>
      <ArrowCommon direction={direction} isActive={isActive} blur={blur}>
        {children}
      </ArrowCommon>
    </Link>
  );
}

export function ArrowButton({children, direction, blur, className, ...props}: ArrowButtonProps) {
  return (
    <button className={`group inline-flex w-fit focus-visible:ring-offset-4 ${className}`} {...props}>
      <ArrowCommon direction={direction} blur={blur}>
        {children}
      </ArrowCommon>
    </button>
  );
}