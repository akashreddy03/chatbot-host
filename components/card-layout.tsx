type ChildComponent = {
    children: JSX.Element
}

export default function CardLayout({ children }: ChildComponent) {
    return (
        <section className="flex-auto flex items-center self-center">
           <div className="bg-white dark:bg-neutral-800 drop-shadow-xl rounded-lg p-8 h-fit w-[28rem]">
                {children}
           </div>
        </section>
    );

}