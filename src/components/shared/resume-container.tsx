type Props = {
    form: React.ReactNode;
    template: React.ReactNode;
};

export default function ResumeContainer({ form, template }: Props): React.ReactElement {
    return (
        <div className="w-full gap-3 md:gap-5 lg:flex lg:gap-7">
            <div className="mb-3 w-full lg:w-1/2">{form}</div>
            <div className="mb-3 hidden w-full md:flex lg:w-1/2">
                <div className="resume-container h-5/6 w-full overflow-auto border border-slate-200 shadow-md">
                    {template}
                </div>
            </div>
        </div>
    );
}
