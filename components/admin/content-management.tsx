"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  ImageIcon,
  Type,
  Layout,
  MessageSquare,
  Zap,
  Globe,
  Code,
  Save,
  GripVertical,
} from "lucide-react"
import { useAdminStore } from "@/lib/admin-store"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const sectionTypes = [
  { id: "hero", name: "Hero Section", icon: Layout, description: "Large banner with title and CTA" },
  { id: "text", name: "Text Block", icon: Type, description: "Rich text content" },
  { id: "image", name: "Image Gallery", icon: ImageIcon, description: "Image showcase" },
  { id: "product_grid", name: "Product Grid", icon: Layout, description: "Display products" },
  { id: "testimonials", name: "Testimonials", icon: MessageSquare, description: "Customer reviews" },
  { id: "cta", name: "Call to Action", icon: Zap, description: "Action button section" },
  { id: "custom", name: "Custom HTML", icon: Code, description: "Custom code block" },
]

const pages = [
  { id: "home", name: "Home Page", url: "/" },
  { id: "about", name: "About Page", url: "/about" },
  { id: "contact", name: "Contact Page", url: "/contact" },
  { id: "shop", name: "Shop Page", url: "/shop" },
]

export function ContentManagement() {
  const [selectedPage, setSelectedPage] = useState("home")
  const [isAddSectionOpen, setIsAddSectionOpen] = useState(false)
  const [editingSection, setEditingSection] = useState<any>(null)

  const { pageContents, addPageSection, updatePageContent, deletePageSection, reorderSections } = useAdminStore()
  const { toast } = useToast()

  const currentPageSections = pageContents.filter((pc) => pc.page === selectedPage).sort((a, b) => a.order - b.order)

  const handleAddSection = (type: string) => {
    const defaultContent = getDefaultContent(type)
    const newSection = {
      page: selectedPage,
      section: `section-${Date.now()}`,
      content: defaultContent,
      type: type as any,
      order: currentPageSections.length + 1,
      isActive: true,
    }
    
    addPageSection(type, newSection)
    
    setIsAddSectionOpen(false)
    toast({
      title: "Section Added",
      description: "New section has been added to the page.",
    })
  }

  const handleUpdateSection = (sectionId: string, content: any) => {
    updatePageContent(sectionId, content)
    setEditingSection(null)
    toast({
      title: "Section Updated",
      description: "Section content has been updated.",
    })
  }

  const handleDeleteSection = (sectionId: string) => {
    deletePageSection(sectionId)
    toast({
      title: "Section Deleted",
      description: "Section has been removed from the page.",
      variant: "destructive",
    })
  }

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(currentPageSections)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    const updatedSections = items.map((item, index) => ({
      ...item,
      order: index + 1,
    }))

    reorderSections(selectedPage, updatedSections)
  }

  const getDefaultContent = (type: string) => {
    switch (type) {
      case "hero":
        return {
          title: "Welcome to Our Store",
          subtitle: "Discover amazing products",
          buttonText: "Shop Now",
          buttonLink: "/shop",
          backgroundImage: "/images/hero-laptop.jpg",
        }
      case "text":
        return {
          title: "About Us",
          content: "Write your content here...",
        }
      case "image":
        return {
          images: ["/images/hero-laptop.jpg"],
          title: "Image Gallery",
        }
      case "product_grid":
        return {
          title: "Featured Products",
          category: "all",
          limit: 8,
        }
      case "testimonials":
        return {
          title: "What Our Customers Say",
          testimonials: [
            {
              name: "John Doe",
              text: "Great service and products!",
              rating: 5,
            },
          ],
        }
      case "cta":
        return {
          title: "Ready to Get Started?",
          subtitle: "Join thousands of satisfied customers",
          buttonText: "Get Started",
          buttonLink: "/shop",
        }
      default:
        return {}
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Content Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your website content and page sections
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="border-gray-200 hover:bg-gray-50 bg-transparent">
            <Eye className="mr-2 h-4 w-4" />
            Preview Site
          </Button>
          <Dialog open={isAddSectionOpen} onOpenChange={setIsAddSectionOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0">
                <Plus className="mr-2 h-4 w-4" />
                Add Section
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Section</DialogTitle>
                <DialogDescription>Choose a section type to add to your page</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                {sectionTypes.map((type) => (
                  <Card
                    key={type.id}
                    className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border-2 hover:border-blue-200"
                    onClick={() => handleAddSection(type.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                          <type.icon className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="font-medium text-gray-900">{type.name}</h3>
                      </div>
                      <p className="text-sm text-gray-500">{type.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Page Selector */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">Select Page</CardTitle>
          <CardDescription>Choose which page you want to edit</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {pages.map((page) => (
              <Button
                key={page.id}
                variant={selectedPage === page.id ? "default" : "outline"}
                className={cn(
                  "h-16 flex-col space-y-1",
                  selectedPage === page.id 
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0" 
                    : "border-2 border-gray-200 hover:border-blue-200"
                )}
                onClick={() => setSelectedPage(page.id)}
              >
                <Globe className="h-5 w-5" />
                <span className="text-sm">{page.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Page Sections */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">
                {pages.find(p => p.id === selectedPage)?.name} Sections
              </CardTitle>
              <CardDescription>Drag and drop to reorder sections</CardDescription>
            </div>
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
              {currentPageSections.length} sections
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="sections">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                  {currentPageSections.map((section, index) => (
                    <Draggable key={section.id} draggableId={section.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={cn(
                            "p-6 bg-white border-2 border-gray-100 rounded-xl transition-all duration-200",
                            snapshot.isDragging ? "shadow-lg scale-[1.02]" : "hover:shadow-md"
                          )}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div
                                {...provided.dragHandleProps}
                                className="p-2 text-gray-400 hover:text-gray-600 cursor-grab"
                              >
                                <GripVertical className="h-5 w-5" />
                              </div>
                              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                                {(() => {
                                  const Icon = sectionTypes.find(t => t.id === section.type)?.icon
                                  return Icon ? <Icon className="h-4 w-4 text-white" /> : null
                                })()}
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900">
                                  {sectionTypes.find(t => t.id === section.type)?.name || 'Custom Section'}
                                </h3>
                                <p className="text-sm text-gray-500">Section {section.order}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={section.isActive}
                                onCheckedChange={(checked) => {
                                  updatePageContent(section.id, { ...section.content, isActive: checked })
                                }}
                              />
                              <Button variant="ghost" size="sm" onClick={() => setEditingSection(section)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteSection(section.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          {/* Section Preview (optional) */}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </CardContent>
      </Card>
    </div>
  )
}
