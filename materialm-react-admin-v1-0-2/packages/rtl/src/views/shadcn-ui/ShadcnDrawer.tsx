import BasicDrawer from 'src/components/shadcn-ui/Drawer/BasicDrawer';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Drawer',
  },
];
const page = () => {
  return (
    <>
      <BreadcrumbComp title="Drawer" items={BCrumb} />
      <div className="grid grid-cols-12 gap-30">
        {/* Basic */}
        <div className="lg:col-span-6 md:col-span-6 col-span-12">
          {/* <BasicDropdown /> */}
          <BasicDrawer />
        </div>
      </div>
    </>
  );
};

export default page;
