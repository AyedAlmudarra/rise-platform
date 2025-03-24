
import BasicCollapse from "src/components/shadcn-ui/Collapsible/BasicCollapse";
import AdvanceCollapse from "src/components/shadcn-ui/Collapsible/AdvanceCollapse";
import BreadcrumbComp from "src/layouts/full/shared/breadcrumb/BreadcrumbComp";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Collapsible",
  },
];
const page = () => {
  return (
    <>
      <BreadcrumbComp title="Collapsible" items={BCrumb} />
      <div className="grid grid-cols-12 gap-30">
        {/* Basic */}
        <div className="lg:col-span-6 md:col-span-6 col-span-12">
          <BasicCollapse />
        </div>
        <div className="lg:col-span-6 md:col-span-6 col-span-12">
          <AdvanceCollapse />
        </div>
      </div>
    </>
  );
};

export default page;
