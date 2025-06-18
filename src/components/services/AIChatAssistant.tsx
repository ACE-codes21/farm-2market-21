
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sparkles, Send, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const AIChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'ai', 
      content: 'Hello! I\'m your AI assistant for government services and schemes. I can help you with information about PM SVANidhi, FSSAI registration, Mudra loans, eligibility criteria, application processes, and much more. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const generateGovernmentServiceResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // PM SVANidhi related queries
    if (message.includes('svanidhi') || message.includes('10000') || message.includes('10k') || message.includes('street vendor loan')) {
      return `**PM SVANidhi Scheme:**

This is a micro-credit facility for street vendors:
• **Loan Amount:** ₹10,000 (first cycle), ₹20,000 (second), ₹50,000 (third)
• **Interest Rate:** 7% per annum
• **Tenure:** 1 year
• **Eligibility:** Street vendors with Certificate of Vending
• **Required Documents:** Aadhaar, Bank account, Mobile number, Vendor certificate
• **Benefits:** No collateral required, digital payment incentives
• **Application:** Through banks, NBFCs, or online portal

Would you like more details about the application process?`;
    }

    // FSSAI related queries
    if (message.includes('fssai') || message.includes('food license') || message.includes('food business')) {
      return `**FSSAI Registration/License:**

Essential for food businesses:
• **Basic Registration:** For small food businesses (turnover < ₹12 lakh)
• **State License:** For medium businesses (₹12 lakh - ₹20 crore)
• **Central License:** For large businesses (> ₹20 crore)
• **Validity:** 1-5 years depending on type
• **Required Documents:** ID proof, address proof, business plan, NOC
• **Fee:** ₹100-₹7,500 depending on category
• **Process:** Online application through FSSAI portal
• **Timeline:** 7-60 days

Food safety training is mandatory for food handlers!`;
    }

    // Mudra loan queries
    if (message.includes('mudra') || message.includes('business loan') || message.includes('micro loan')) {
      return `**Mudra Loan Scheme:**

Three categories available:
• **Shishu:** Up to ₹50,000 for starting businesses
• **Kishore:** ₹50,001 to ₹5 lakh for growing businesses  
• **Tarun:** ₹5,00,001 to ₹10 lakh for established businesses
• **Interest Rate:** 8-12% (varies by bank)
• **Tenure:** Up to 5 years
• **Collateral:** Not required for loans up to ₹10 lakh
• **Eligibility:** Non-corporate, non-farm enterprises
• **Required Documents:** Business plan, ID proof, address proof, bank statements

Contact your nearest bank or NBFC for application!`;
    }

    // Udyog Aadhar queries
    if (message.includes('udyog') || message.includes('msme registration') || message.includes('business registration')) {
      return `**Udyog Aadhar Registration:**

Essential for MSME benefits:
• **Cost:** Free of cost
• **Validity:** Lifetime (update every 5 years)
• **Benefits:** Easy bank loans, government subsidies, tender preferences
• **Required:** Aadhaar number and basic business details
• **Classification:** 
  - Micro: Investment < ₹1 crore, Turnover < ₹5 crore
  - Small: Investment < ₹10 crore, Turnover < ₹50 crore
  - Medium: Investment < ₹50 crore, Turnover < ₹250 crore
• **Process:** Online registration at udyamregistration.gov.in
• **Timeline:** Immediate certificate generation

This replaced the earlier Udyog Aadhar system in 2020.`;
    }

    // Jan Dhan Yojana queries
    if (message.includes('jan dhan') || message.includes('bank account') || message.includes('pradhan mantri jan dhan')) {
      return `**Pradhan Mantri Jan Dhan Yojana:**

Financial inclusion scheme:
• **Zero Balance:** No minimum balance required
• **Free Services:** Debit card, mobile banking, checkbook
• **Overdraft Facility:** Up to ₹10,000 (after 6 months)
• **Accident Insurance:** ₹2 lakh (RuPay card usage)
• **Life Insurance:** ₹30,000 (conditions apply)
• **Required Documents:** Aadhaar/Voter ID/PAN/NREGA card
• **Benefits:** Direct Benefit Transfer (DBT) eligible
• **Opening:** Any bank branch or Business Correspondent

Over 45 crore accounts opened successfully!`;
    }

    // PM-SYM queries
    if (message.includes('pm-sym') || message.includes('pension') || message.includes('shram yogi')) {
      return `**PM Shram Yogi Maan-Dhan (PM-SYM):**

Pension scheme for unorganized workers:
• **Entry Age:** 18-40 years
• **Monthly Contribution:** ₹55-₹200 (age-dependent)
• **Pension Amount:** ₹3,000 per month after 60 years
• **Government Matching:** Equal contribution by government
• **Eligibility:** Monthly income ≤ ₹15,000, not EPFO/ESIC member
• **Required:** Bank account, Aadhaar, mobile number
• **Enrollment:** Common Service Centers, banks, online portal
• **Withdrawal:** Premature exit with interest or nominee benefits

Family pension available for spouse!`;
    }

    // Application process queries
    if (message.includes('how to apply') || message.includes('application process') || message.includes('documents needed')) {
      return `**General Application Process:**

**Common Documents Needed:**
• Aadhaar Card (mandatory for most schemes)
• PAN Card (for higher loan amounts)
• Bank account details
• Mobile number (Aadhaar-linked)
• Passport-size photographs
• Address proof
• Income certificate (if applicable)

**Application Channels:**
• Online portals (recommended)
• Bank branches
• Common Service Centers (CSCs)
• Post offices (for some schemes)

**Tips:**
• Keep documents ready in both physical and digital format
• Ensure Aadhaar is linked to bank account and mobile
• Check eligibility criteria before applying
• Follow up on application status regularly

Which specific scheme application process interests you?`;
    }

    // Eligibility queries
    if (message.includes('eligibility') || message.includes('who can apply') || message.includes('criteria')) {
      return `**General Eligibility Criteria:**

**Common Requirements:**
• Indian citizenship
• Valid Aadhaar card
• Age criteria (scheme-specific)
• Income limits (where applicable)
• Bank account in applicant's name

**Specific Eligibilities:**
• **Street vendors:** Need Certificate of Vending
• **Food businesses:** Require FSSAI registration
• **MSMEs:** Investment and turnover limits apply
• **Unorganized workers:** Income ≤ ₹15,000/month

**Disqualifications:**
• Already availing similar government schemes
• Defaulter in previous government loans
• Tax evader or under investigation

Use our Eligibility Checker tool for personalized assessment!`;
    }

    // Benefits and subsidies
    if (message.includes('benefits') || message.includes('subsidy') || message.includes('advantages')) {
      return `**Government Scheme Benefits:**

**Financial Benefits:**
• Collateral-free loans at subsidized rates
• Interest subvention (reduced interest)
• Credit guarantee coverage
• Cashback on digital transactions

**Business Benefits:**
• Easy tender participation (MSME preference)
• Government procurement opportunities
• Technology and skill development support
• Marketing assistance

**Social Benefits:**
• Insurance coverage
• Pension security
• Financial inclusion
• Bank account benefits

**Tax Benefits:**
• Income tax exemptions (conditions apply)
• GST registration benefits
• Reduced compliance burden

Each scheme has specific benefits - which one interests you most?`;
    }

    // Loan repayment queries
    if (message.includes('repayment') || message.includes('emi') || message.includes('installment')) {
      return `**Loan Repayment Information:**

**PM SVANidhi:**
• Tenure: 12 months
• Monthly EMI basis
• Digital payment incentives for early repayment
• 7% annual interest rate

**Mudra Loans:**
• Flexible tenure up to 5 years
• EMI varies by loan amount and bank
• Prepayment allowed without penalty
• Interest rates: 8-12% annually

**Repayment Tips:**
• Set up auto-debit for timely payments
• Maintain good credit score
• Use digital payments for incentives
• Contact bank immediately if facing difficulties

**Default Consequences:**
• Credit score impact
• Difficulty in future loans
• Legal action (in extreme cases)

Need help calculating EMI for any specific loan amount?`;
    }

    // Digital payment and incentives
    if (message.includes('digital payment') || message.includes('cashback') || message.includes('incentive')) {
      return `**Digital Payment Incentives:**

**PM SVANidhi Digital Benefits:**
• ₹100 monthly cashback on digital transactions
• Must complete minimum 50 transactions per month
• Each transaction should be ≥ ₹10
• Cashback credited monthly to bank account

**Eligible Digital Modes:**
• UPI (PhonePe, Google Pay, Paytm, etc.)
• POS machines
• QR code payments
• Mobile banking

**Additional Benefits:**
• Credit score improvement
• Better loan terms for next cycle
• Business growth tracking
• Customer convenience

**Setup Requirements:**
• Bank account linked to UPI
• QR code display at business location
• Basic smartphone knowledge

Would you like help setting up digital payments?`;
    }

    // Contact and support
    if (message.includes('contact') || message.includes('helpline') || message.includes('support') || message.includes('complaint')) {
      return `**Contact & Support Information:**

**Helpline Numbers:**
• PM SVANidhi: 1800-270-0076
• FSSAI: 1800-112-100
• Mudra: Contact respective bank
• Jan Dhan: 1800-11-0001
• PM-SYM: 14434

**Online Support:**
• Official scheme websites
• Citizen service portals
• Bank customer care
• Social media handles

**Physical Support:**
• Bank branches
• Common Service Centers
• District Collector offices
• Block Development offices

**Complaint Registration:**
• CPGRAMS portal (online)
• PM India portal
• RTI applications
• Local administrative offices

**Response Time:** Usually 15-30 days for grievances.

Need specific contact information for any scheme?`;
    }

    // Renewal and updates
    if (message.includes('renewal') || message.includes('update') || message.includes('validity')) {
      return `**Renewal & Update Information:**

**License Renewals:**
• **FSSAI:** Before expiry (1-5 years validity)
• **Udyog Aadhar:** Update every 5 years
• **Vendor License:** As per local municipal rules

**Update Requirements:**
• Change in business address
• Ownership transfer
• Business expansion
• Contact details modification

**Process:**
• Login to respective portals
• Update required information
• Upload new documents (if needed)
• Pay renewal fees (where applicable)

**Important:**
• Apply 30-60 days before expiry
• Late renewals may attract penalties
• Business operations may be affected if expired

**Auto-renewal:** Available for some schemes with bank mandate.

Which specific renewal do you need help with?`;
    }

    // Greetings
    if (message.includes('hello') || message.includes('hi') || message.includes('help') || message.includes('assist')) {
      return `Hello! I'm specialized in government services and schemes for businesses and individuals. I can provide detailed information about:

🏦 **Loan Schemes:** PM SVANidhi, Mudra Loan
📋 **Licenses:** FSSAI, Udyog Aadhar  
🛡️ **Welfare:** PM-SYM, Jan Dhan Yojana
📱 **Digital Benefits:** Payment incentives, subsidies
📞 **Support:** Application process, eligibility, contacts

Ask me anything specific, like:
• "How to get PM SVANidhi loan?"
• "FSSAI registration process"
• "Mudra loan eligibility"
• "Digital payment benefits"

What would you like to know?`;
    }

    // Default response for unrecognized queries
    return `I understand you're asking about government services. Let me help! I specialize in:

**Popular Schemes:**
• **PM SVANidhi** - ₹10K-50K loans for street vendors
• **Mudra Loans** - Up to ₹10 lakh for businesses
• **FSSAI Registration** - Food business licenses
• **Udyog Aadhar** - MSME registration benefits
• **PM-SYM** - Pension scheme for workers
• **Jan Dhan Yojana** - Zero balance bank accounts

**I can help with:**
• Eligibility criteria and requirements
• Application processes and documents
• Benefits and interest rates
• Renewal and update procedures
• Contact information and support

Could you please be more specific about which scheme or service you need information about? For example, you could ask "How to apply for PM SVANidhi?" or "What documents are needed for FSSAI license?"`;
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const userMessage: Message = { 
      role: 'user', 
      content: inputValue,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Generate AI response
    setTimeout(() => {
      const aiResponse: Message = { 
        role: 'ai', 
        content: generateGovernmentServiceResponse(inputValue),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      setTimeout(() => {
        const viewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
          viewport.scrollTop = viewport.scrollHeight;
        }
      }, 100);
    }
  }, [messages]);

  return (
    <Card className="dark-modern-card mt-6 animate-fade-in h-[600px] flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center gap-3 text-white">
          <div className="p-2 rounded-lg bg-green-500/20">
            <Sparkles className="h-6 w-6 text-green-400" />
          </div>
          AI Government Services Assistant
        </CardTitle>
        <CardDescription>
          Get instant answers about schemes, licenses, loans, and application processes
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        {/* Chat Messages */}
        <ScrollArea className="flex-1 px-6" ref={scrollAreaRef}>
          <div className="space-y-4 py-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-3",
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'ai' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-green-400" />
                  </div>
                )}
                
                <div
                  className={cn(
                    "rounded-lg px-4 py-3 max-w-[80%] break-words",
                    message.role === 'user'
                      ? 'bg-blue-600 text-white ml-12'
                      : 'bg-slate-800/60 text-slate-200 border border-slate-700/50'
                  )}
                >
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </div>
                  <div className={cn(
                    "text-xs mt-2 opacity-70",
                    message.role === 'user' ? 'text-blue-100' : 'text-slate-400'
                  )}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                {message.role === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-400" />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-start gap-3 justify-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-green-400" />
                </div>
                <div className="bg-slate-800/60 text-slate-200 border border-slate-700/50 rounded-lg px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-green-400 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 bg-green-400 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Quick Suggestions */}
        <div className="px-6 py-3 border-t border-slate-700/50">
          <div className="flex flex-wrap gap-2 mb-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputValue("How to apply for PM SVANidhi loan?")}
              className="text-xs bg-slate-800/50 border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              PM SVANidhi Loan
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputValue("FSSAI registration process and documents")}
              className="text-xs bg-slate-800/50 border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              FSSAI License
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputValue("Mudra loan eligibility and interest rates")}
              className="text-xs bg-slate-800/50 border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Mudra Loan
            </Button>
          </div>
        </div>

        {/* Input Area */}
        <div className="px-6 pb-6">
          <div className="flex gap-3 items-end">
            <Input
              placeholder="Ask about any government scheme, license, or application process..."
              className="dark-input text-sm resize-none min-h-[40px]"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <Button 
              onClick={handleSendMessage}
              disabled={isLoading || inputValue.trim() === ''}
              className="bg-green-600 hover:bg-green-700 px-4"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChatAssistant;
