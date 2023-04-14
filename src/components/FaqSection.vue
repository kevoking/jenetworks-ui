<template>
  <div class="w-full">
    <div v-if="showFaqs.length > 0" class="py-12 space-y-8">
      <div class="relative">
				<div class="absolute inset-0 flex items-center">
					<div class="w-full border-t-2 orange-border"></div>
				</div>
				<div class="relative flex justify-center text-sm">
					<h2 class="py-4 px-8 text-2xl font-bold orange-bg text-black rounded-full">Frequently Asked Questions</h2>
				</div>
			</div>
      <div class="space-y-12 px-12">
        <Accordion class="accordion-custom" :activeIndex="0">
            <AccordionTab  v-for="(group, groupIndex) in showFaqs" :key="groupIndex" :header="group.title">
                <!-- <template #header>
                    <h3 class="flex flex-row justify-start items-center flex-nowrap text-lg font-bold orange-text px-4">{{ group.title }}</h3>
                </template> -->
                <div class="px-4 py-6">
              <div v-for="(faq, index) in group.faqs" :key="index" class="px-4 py-2">
                <h3 class="font-semibold text-gray-700 flex flex-row justify-start items-center flex-nowrap space-x-2 ">
                  <span>{{ index + 1 }}</span>
                  <span>{{ faq.question }}</span>
                </h3>
                <p class="text-gray-600">{{ faq.answer }}</p>
              </div>
            </div>
            </AccordionTab>
            
        </Accordion>

      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
const props = defineProps({
  id: String
})

const domainFaqs = ref([
  {
    id: 'domains',
    title: 'Domain Management',
    faqs: [
      {
        question: 'Why is domain name registration required?',
        answer: 'When you build a website, you want visitors to come and see what you\'ve done. To get them there, you need a unique domain name that connects to your site\'s servers. Domain name registration is required to ensure that no one else in the world can claim ownership of your site\'s address and to make finding your website simple.'
      }, {
        question: 'How does domain registration work?',
        answer: 'Think of the name you want to register. The answer is typically your company or website name. It is best to keep your domain name short and easy to understand. Next, search to see if it is available. If the name you desire is taken with the .com top-level domain, there are hundreds of others available. Finally, add the top choices to your cart and complete the domain registration.'
      }, {
        question: 'How do I pick the right domain name?',
        answer: 'So, you’ve discovered that simply Googling ‘register website domain’ and finding a great provider isn’t the whole story. You also need to consider which domain extension to pick, and which name to register.'
      },{
        question: 'How can I check if a domain is available?',
        answer: 'Use our domain name search tool to search thousands of domain names, filter, and buy — all in one place. When your results return, you can add the domains to your cart or make an offer.'
      }, {
        question: 'What’s the maximum and minimum length a domain name can be?',
        answer: 'You can choose from 1 to 63 characters for your domain name, but remember, the shorter it is, the more memorable it will be.'
      }, {
        question: 'Is .com the best domain for search engine optimization (SEO)?',
        answer: 'Search engines, like Google, consider all domains equal, meaning that just because you have a .com domain name, you won’t necessarily feature higher in the rankings.'
      }
    ]
  },{
    id: 'dedicated-server',
    title: 'Dedicated Servers',
    faqs: [
      {
        question: 'What is a Dedicated Server?',
        answer: 'A dedicated hosting service, dedicated server, or managed hosting service is a type of Internet hosting in which the client leases an entire server not shared with anyone else.'
      }, {
        question: 'Why do I need a Dedicated Server?',
        answer: 'A dedicated server provides maximum flexibility, uptime, and scalability. In case you are planning to launch an online medium/large business, then you must choose a dedicated server. Also, if your traffic is more, then you must migrate to a dedicated server.'
      }, {
        question: 'What are the benefits of a Dedicated Server Hosting?',
        answer: 'It offers more power and adaptability by properly managing and configuring servers with root access. A dedicated server benefits high-traffic websites, applications, content streaming, machine learning, big data, game servers, and many more.'
      }, {
        question: 'How many IP addresses come with a dedicated server?',
        answer: 'You can purchase up to 5 IP addresses with each dedicated sever.'
      }, {
        question: 'What control panel do you provide with the Dedicated Server?',
        answer: 'To manage the server, you get a server management panel. Also, to manage hosting, you get WHM/cPanel as an add-on.'
      }, {
        question: 'How can I access my Dedicated server?',
        answer: 'You can access server via SSH client, cPanel/WHM control panel, or by dedicated server control panel.'
      }
    ]
  }
])

const showFaqs = ref(computed(() => {
  if (props.id && props.id !== '') return domainFaqs.value.filter(e => e.id === props.id)
  else return domainFaqs.value
}))
</script>

<style type="text/css">
  .p-accordion .p-accordion-header .p-accordion-header-link {
    background: #da6c00;
  }
  .p-accordion .p-accordion-header:hover .p-accordion-header-link {
    background: #da6c00;
  }
  .p-accordion .p-accordion-header:not(.p-disabled).p-highlight .p-accordion-header-link {
    background: #da6c00;
  }
</style>
