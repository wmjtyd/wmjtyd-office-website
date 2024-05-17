import Layout from './layout';
import Link from 'next/link';
import { Button } from './buttons';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from './carousel';

export default function HomePage() {
  return (
    <Layout>
      <div className="min-h-screen flex flex-col">
        <header className="bg-[#0055b8] text-white py-4 px-6 md:px-12 flex items-center justify-between">
          <Link href="#">
            <div className="flex items-center gap-2">
              <img
                alt="Huawei Logo"
                height={40}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
                width={40}
              />
              <span className="text-lg font-bold">Huawei</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link className="hover:underline" href="#">
              产品
            </Link>
            <Link className="hover:underline" href="#">
              解决方案
            </Link>
            <Link className="hover:underline" href="#">
              服务
            </Link>
            <Link className="hover:underline" href="#">
              开发者
            </Link>
            <Link className="hover:underline" href="#">
              关于我们
            </Link>
            <div className="flex-grow"></div>
            <div className="flex items-center gap-4">
              <Link className="hover:underline" href="/login">
                登录
              </Link>
              <Link className="hover:underline" href="/register">
                注册
              </Link>
            </div>
          </nav>
          <Button className="md:hidden" variant="outline">
            <MenuIcon className="h-6 w-6" />
          </Button>
        </header>
        <section className="bg-[#0055b8] text-white py-12 md:py-24 flex flex-col md:flex-row items-center justify-between px-6 md:px-12">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">探索无限可能</h1>
            <p className="text-lg">华为致力于为全球用户提供优质的产品和服务,让数字世界惠及每个人、每个家庭、每个组织。</p>
            <div className="flex gap-4">
              <Button variant="primary">了解更多</Button>
              <Button variant="outline">立即购买</Button>
            </div>
          </div>
          <Carousel className="w-full md:w-[50%] mt-8 md:mt-0">
            <CarouselContent>
              <CarouselItem>
                <img
                  alt="Hero Image 1"
                  className="aspect-[16/9] object-cover"
                  height={450}
                  src="/placeholder.svg"
                  width={800}
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  alt="Hero Image 2"
                  className="aspect-[16/9] object-cover"
                  height={450}
                  src="/placeholder.svg"
                  width={800}
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  alt="Hero Image 3"
                  className="aspect-[16/9] object-cover"
                  height={450}
                  src="/placeholder.svg"
                  width={800}
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
        <section className="bg-gray-100 py-12 md:py-24 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">我们的产品</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  alt="Product 1"
                  className="w-full h-48 object-cover"
                  height={300}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "400/300",
                    objectFit: "cover",
                  }}
                  width={400}
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">Mate 50 Pro</h3>
                  <p className="text-gray-600">华为旗舰手机,采用先进的摄影技术和强大的性能。</p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  alt="Product 2"
                  className="w-full h-48 object-cover"
                  height={300}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "400/300",
                    objectFit: "cover",
                  }}
                  width={400}
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">MateBook X Pro</h3>
                  <p className="text-gray-600">轻薄便携的高性能笔记本电脑,为您的工作和生活带来便利。</p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  alt="Product 3"
                  className="w-full h-48 object-cover"
                  height={300}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "400/300",
                    objectFit: "cover",
                  }}
                  width={400}
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">HUAWEI Watch 3</h3>
                  <p className="text-gray-600">时尚智能手表,提供全面的健康和运动监测功能。</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white py-12 md:py-24 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">新闻动态</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <img
                  alt="News 1"
                  className="w-full h-40 object-cover"
                  height={225}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "400/225",
                    objectFit: "cover",
                  }}
                  width={400}
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">华为发布全新 Mate 50 系列手机</h3>
                  <p className="text-gray-600">
                    华为在今日发布了全新的 Mate 50 系列手机,包括 Mate 50 Pro 和 Mate 50 RS 两款旗舰机型。
                  </p>
                  <Link className="text-[#0055b8] font-medium mt-2 inline-block" href="#">
                    了解更多 >
                  </Link>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <img
                  alt="News 2"
                  className="w-full h-40 object-cover"
                  height={225}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "400/225",
                    objectFit: "cover",
                  }}
                  width={400}
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">华为发布全新 MateBook X Pro 笔记本电脑</h3>
                  <p className="text-gray-600">
                    华为在今日发布了全新的 MateBook X Pro 笔记本电脑,采用全新的设计和强大的性能。
                  </p>
                  <Link className="text-[#0055b8] font-medium mt-2 inline-block" href="#">
                    了解更多 >
                  </Link>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <img
                  alt="News 3"
                  className="w-full h-40 object-cover"
                  height={225}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "400/225",
                    objectFit: "cover",
                  }}
                  width={400}
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">华为发布全新 HUAWEI Watch 3 智能手表</h3>
                  <p className="text-gray-600">
                    华为在今日发布了全新的 HUAWEI Watch 3 智能手表,提供全面的健康和运动监测功能。
                  </p>
                  <Link className="text-[#0055b8] font-medium mt-2 inline-block" href="#">
                    了解更多 >
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className="bg-[#0055b8] text-white py-8 px-6 md:px-12">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <img
                alt="Huawei Logo"
                height={40}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
                width={40}
              />
              <span className="text-lg font-bold">Huawei</span>
            </div>
            <nav className="flex flex-col md:flex-row items-center gap-4">
              <Link className="hover:underline" href="#">
                产品
              </Link>
              <Link className="hover:underline" href="#">
                解决方案
              </Link>
              <Link className="hover:underline" href="#">
                服务
              </Link>
              <Link className="hover:underline" href="#">
                开发者
              </Link>
              <Link className="hover:underline" href="#">
                关于我们
              </Link>
            </nav>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Link className="hover:underline" href="#">
                联系我们
              </Link>
              <Link className="hover:underline" href="#">
                隐私政策
              </Link>
              <div className="flex items-center gap-2">
                <FacebookIcon className="h-6 w-6" />
                <TwitterIcon className="h-6 w-6" />
                <InstagramIcon className="h-6 w-6" />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
}

function FacebookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
