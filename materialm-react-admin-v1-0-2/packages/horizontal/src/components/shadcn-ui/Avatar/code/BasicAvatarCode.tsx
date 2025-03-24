
import CodeModal from '../../CodeModal'

const BasicAvatarCode = () => {
  return (
    <CodeModal>
        {
            `
import { Avatar, AvatarFallback, AvatarImage } from "src/components/shadcn-ui/Default-Ui/avatar"

<Avatar>
    <AvatarImage src="/src/assets/images/profile/user-3.jpg" alt="user" />
    <AvatarFallback>CN</AvatarFallback>
</Avatar> 
<Avatar>
    <AvatarImage src="/src/assets/images/profile/user-2.jpg" />
    <AvatarFallback>CN</AvatarFallback>
</Avatar> 
<Avatar>
    <AvatarImage src="/src/assets/images/profile/user-4.jpg" />
    <AvatarFallback>CN</AvatarFallback>
</Avatar>
<Avatar>
    <AvatarImage src="/src/assets/images/profile/user-5.jpg" />
    <AvatarFallback>CN</AvatarFallback>
</Avatar>
<Avatar>
    <AvatarImage src="/src/assets/images/profile/user-6.jpg" />
    <AvatarFallback>CN</AvatarFallback>
</Avatar>
            `
        }
    </CodeModal>
  )
}

export default BasicAvatarCode