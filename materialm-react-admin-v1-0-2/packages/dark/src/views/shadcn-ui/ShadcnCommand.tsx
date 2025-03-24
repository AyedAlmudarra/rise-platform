
import BasicCommand from "src/components/shadcn-ui/Command/BasicCommand";
import DialogCommand from "src/components/shadcn-ui/Command/DialogCommand";
import BreadcrumbComp from "src/layouts/full/shared/breadcrumb/BreadcrumbComp";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Command",
  },
];
const page = () => {
  return (
    <div>
      <BreadcrumbComp title="Command" items={BCrumb} />
      <div className="grid grid-cols-12 gap-30">
        {/* Basic */}
        <div className="lg:col-span-6 md:col-span-6 col-span-12">
          <BasicCommand />
        </div>
        <div className="lg:col-span-6 md:col-span-6 col-span-12">
          <DialogCommand />
        </div>
      </div>
    </div>
  );
};

export default page;
