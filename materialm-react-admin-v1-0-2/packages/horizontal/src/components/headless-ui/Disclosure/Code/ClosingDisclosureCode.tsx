import CodeModal from 'src/components/ui-components/CodeModal'


const ClosingDisclosureCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    
    import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    CloseButton,
    } from "@headlessui/react";
    
    import CardBox from "src/components/shared/CardBox";
    import MyCustomLink from "./MyLink";
    import { Icon } from "@iconify/react";

    <Disclosure>
        <DisclosureButton className="group bg-primary ui-button">
        Open mobile menu
        <Icon
            icon="solar:alt-arrow-down-outline"
            height={18}
            className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180"
        />
        </DisclosureButton>
        <DisclosurePanel>
        <CloseButton as={MyCustomLink} >
            Go with your link
        </CloseButton>
        </DisclosurePanel>
    </Disclosure>
        
        `}
      </CodeModal>
    </div>
  )
}

export default ClosingDisclosureCode
