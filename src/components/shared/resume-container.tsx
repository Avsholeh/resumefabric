type Props = {
  form: React.ReactNode;
  template: React.ReactNode;
};

export default function ResumeContainer({ form, template }: Props): React.ReactElement {
  return (
    <div className="w-full gap-3 md:gap-5 lg:flex lg:gap-7">
      <div className="mb-3 w-full lg:w-1/2">{form}</div>
      <div className="mb-3 hidden w-full lg:flex lg:w-1/2 lg:justify-center">
        <div className="resume-container w-full max-w-[680px] origin-top scale-110 overflow-auto">{template}</div>
      </div>
    </div>
  );
}
