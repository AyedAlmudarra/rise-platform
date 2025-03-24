
import CodeModal from '../../CodeModal'

const CarouselMultipleItemCode = () => {
  return (
    <CodeModal>
        {
            `
import { Card, CardContent } from "src/components/shadcn-ui/Default-Ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "src/components/shadcn-ui/Default-Ui/carousel"

<Carousel className="w-full max-w-xs">
    <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                    <Card className='border-border'>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                            <span className="text-4xl text-ld font-semibold">{index + 1}</span>
                        </CardContent>
                    </Card>
                </div>
            </CarouselItem>
        ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
</Carousel>            
            `
        }
    </CodeModal>
  )
}

export default CarouselMultipleItemCode
