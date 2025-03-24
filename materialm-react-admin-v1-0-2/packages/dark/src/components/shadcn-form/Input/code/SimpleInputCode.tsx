
import CodeModal from 'src/components/shadcn-ui/CodeModal'


const SimpleInputcode = () => {
  return (
    <>
      <CodeModal>
        {`  
import { Input } from "src/components/shadcn-ui/Default-Ui/input";

<div className="flex flex-col gap-5">
    <Input type="text" placeholder="Name" />
    <Input type="text" placeholder="Comapny" />
    <Input type="email" placeholder="Email" />
    <Input type="password" placeholder="Password" />
</div>
                `}
      </CodeModal>
    </>
  )
}

export default SimpleInputcode