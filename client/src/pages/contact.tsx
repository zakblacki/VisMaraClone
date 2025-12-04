import { useState } from "react";
import { useSearch, useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { ChevronRight, Phone, Mail, MapPin, Clock, Send, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { companyInfo } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { createInquiry } from "@/lib/api";

const contactFormSchema = z.object({
  name: z.string().min(2, "Il nome deve avere almeno 2 caratteri"),
  email: z.string().email("Inserisci un indirizzo email valido"),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(1, "Seleziona un argomento"),
  message: z.string().min(10, "Il messaggio deve avere almeno 10 caratteri"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [, setLocation] = useLocation();
  const searchParams = useSearch();
  const productCode = new URLSearchParams(searchParams).get("product") || "";
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: productCode ? "product-info" : "",
      message: productCode ? `Richiesta informazioni per il prodotto: ${productCode}\n\n` : "",
    },
  });

  const inquiryMutation = useMutation({
    mutationFn: createInquiry,
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Messaggio inviato!",
        description: "Ti risponderemo al più presto.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Errore",
        description: error.message || "Si è verificato un errore. Riprova più tardi.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    inquiryMutation.mutate(data);
  };

  const isSubmitting = inquiryMutation.isPending;

  const subjects = [
    { value: "product-info", label: "Informazioni prodotto" },
    { value: "quote", label: "Richiesta preventivo" },
    { value: "support", label: "Assistenza tecnica" },
    { value: "partnership", label: "Collaborazione commerciale" },
    { value: "other", label: "Altro" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="bg-background border-b">
          <div className="container mx-auto px-4 lg:px-8 py-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <button 
                onClick={() => setLocation("/")}
                className="hover:text-foreground cursor-pointer"
              >
                Home
              </button>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">Contatti</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold">Contattaci</h1>
            <p className="text-muted-foreground mt-2">
              Siamo a tua disposizione per qualsiasi informazione o richiesta
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Invia un messaggio</CardTitle>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Messaggio inviato!</h3>
                      <p className="text-muted-foreground mb-6">
                        Grazie per averci contattato. Ti risponderemo al più presto.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsSubmitted(false);
                          form.reset();
                        }}
                        data-testid="button-send-another"
                      >
                        Invia un altro messaggio
                      </Button>
                    </div>
                  ) : (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nome *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Il tuo nome" {...field} data-testid="input-contact-name" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email *</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="La tua email" {...field} data-testid="input-contact-email" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Telefono</FormLabel>
                                <FormControl>
                                  <Input type="tel" placeholder="Il tuo numero" {...field} data-testid="input-contact-phone" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Azienda</FormLabel>
                                <FormControl>
                                  <Input placeholder="Nome azienda" {...field} data-testid="input-contact-company" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Argomento *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-contact-subject">
                                    <SelectValue placeholder="Seleziona un argomento" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {subjects.map((subject) => (
                                    <SelectItem key={subject.value} value={subject.value}>
                                      {subject.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Messaggio *</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Scrivi il tuo messaggio..."
                                  className="min-h-[150px] resize-none"
                                  {...field}
                                  data-testid="textarea-contact-message"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          className="w-full sm:w-auto"
                          disabled={isSubmitting}
                          data-testid="button-submit-contact"
                        >
                          {isSubmitting ? (
                            <>Invio in corso...</>
                          ) : (
                            <>
                              Invia messaggio
                              <Send className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informazioni di contatto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <a
                    href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
                    className="flex items-start gap-3 p-3 rounded-lg hover-elevate transition-colors"
                    data-testid="link-contact-phone"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Telefono</p>
                      <p className="text-sm text-muted-foreground">{companyInfo.phone}</p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${companyInfo.email}`}
                    className="flex items-start gap-3 p-3 rounded-lg hover-elevate transition-colors"
                    data-testid="link-contact-email"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{companyInfo.email}</p>
                    </div>
                  </a>

                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      companyInfo.address + " " + companyInfo.city
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-3 rounded-lg hover-elevate transition-colors"
                    data-testid="link-contact-address"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Indirizzo</p>
                      <p className="text-sm text-muted-foreground">
                        {companyInfo.address}
                        <br />
                        {companyInfo.city}
                      </p>
                    </div>
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Orari di apertura</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-sm">
                      <p className="flex justify-between mb-1">
                        <span className="text-muted-foreground">Lun - Ven</span>
                        <span className="font-medium">08:00 - 18:00</span>
                      </p>
                      <p className="flex justify-between mb-1">
                        <span className="text-muted-foreground">Sabato</span>
                        <span className="font-medium">08:00 - 12:00</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-muted-foreground">Domenica</span>
                        <span className="font-medium">Chiuso</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Hai bisogno di assistenza urgente?</h3>
                  <p className="text-sm opacity-90 mb-4">
                    Il nostro team di supporto tecnico è disponibile per aiutarti.
                  </p>
                  <Button 
                    variant="secondary" 
                    className="w-full" 
                    asChild
                  >
                    <a href={`tel:${companyInfo.phone.replace(/\s/g, "")}`} data-testid="button-urgent-call">
                      <Phone className="mr-2 h-4 w-4" />
                      Chiamaci ora
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
