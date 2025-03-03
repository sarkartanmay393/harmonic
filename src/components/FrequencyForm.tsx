
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Frequency, addFrequency } from '@/lib/frequencies';
import { toast } from 'sonner';

const frequencyFormSchema = z.object({
  id: z.string().min(3).max(20),
  name: z.string().min(2).max(50),
  hz: z.coerce.number().min(1).max(20000),
  description: z.string().min(10),
  benefits: z.string(),
  origin: z.string().min(10),
  location: z.object({
    name: z.string().min(2),
    lat: z.coerce.number(),
    lng: z.coerce.number()
  }),
  imageUrl: z.string().url(),
  category: z.enum(['healing', 'meditation', 'ancient', 'scientific', 'spiritual']),
  color: z.string().min(4)
});

type FrequencyFormValues = z.infer<typeof frequencyFormSchema>;

const FrequencyForm: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const defaultValues: Partial<FrequencyFormValues> = {
    id: '',
    name: '',
    hz: 432,
    description: '',
    benefits: '',
    origin: '',
    location: {
      name: '',
      lat: 0,
      lng: 0
    },
    imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'meditation',
    color: '#9C27B0'
  };

  const form = useForm<FrequencyFormValues>({
    resolver: zodResolver(frequencyFormSchema),
    defaultValues
  });

  const onSubmit = (data: FrequencyFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Convert benefits string to array
      const benefitsArray = data.benefits.split('\n').filter(benefit => benefit.trim().length > 0);
      
      // Create the frequency object
      const newFrequency: Frequency = {
        ...data,
        benefits: benefitsArray
      };
      
      // Add to the frequencies collection
      addFrequency(newFrequency);
      
      // Show success message
      toast.success('Frequency added successfully', {
        description: `${data.name} (${data.hz} Hz) has been added to the collection.`
      });
      
      // Reset form
      form.reset(defaultValues);
      
      // Navigate to frequency detail
      setTimeout(() => {
        navigate(`/frequency/${data.id}`);
      }, 1500);
    } catch (error) {
      console.error('Error adding frequency:', error);
      toast.error('Failed to add frequency', {
        description: 'An error occurred while adding the frequency. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Frequency</CardTitle>
        <CardDescription>
          Contribute to our frequency library by adding a new vibrational frequency
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 528hz" {...field} />
                    </FormControl>
                    <FormDescription>
                      Unique identifier (no spaces)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Miracle Tone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="hz"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frequency (Hz)</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" max="20000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="healing">Healing</SelectItem>
                        <SelectItem value="meditation">Meditation</SelectItem>
                        <SelectItem value="ancient">Ancient</SelectItem>
                        <SelectItem value="scientific">Scientific</SelectItem>
                        <SelectItem value="spiritual">Spiritual</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the properties and history of this frequency..." 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="benefits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Benefits</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="List benefits, one per line..." 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Enter each benefit on a new line
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="origin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Origin</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the origin and history..." 
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="location.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., New York, USA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="location.lat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.0001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="location.lng"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.0001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormDescription>
                      Link to an image representing this frequency
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input type="text" placeholder="#9C27B0" {...field} />
                      </FormControl>
                      <div 
                        className="h-10 w-10 rounded-md border"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
                    <FormDescription>
                      Hex color code (e.g., #9C27B0)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <CardFooter className="px-0 pt-4">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Adding Frequency...' : 'Add Frequency'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default FrequencyForm;
