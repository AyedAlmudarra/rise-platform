
import CodeModal from '../../CodeModal'

const OutlineButtonCode = () => {
  return (
    <CodeModal>
        {
            `
import { Button } from 'src/components/shadcn-ui/Default-Ui/button'

<Button variant="outline">Primary</Button>
<Button variant="outlinesecondary">Secondary</Button>
<Button variant="outlinesuccess">Success</Button>
<Button variant="outlinewarning">Warning</Button>
<Button variant="outlineerror">Error</Button>
<Button variant="outlineinfo">Info</Button>
            `
        }
    </CodeModal>
  )
}

export default OutlineButtonCode