import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedAvatar } from "./AnimatedAvatar"
import { CharacterCustomization } from "@/hooks/useUserProfile"
import { Palette, Edit3, Sparkles } from "lucide-react"

interface CharacterCreatorProps {
  isOpen: boolean
  onComplete?: (username: string, character: CharacterCustomization) => void
  editMode?: boolean
  currentCharacter?: CharacterCustomization
  currentUsername?: string
  onSave?: (character: CharacterCustomization) => void
  onCancel?: () => void
}

// More realistic human skin tones
const skinColors = [
  "#FDBCB4", // Light
  "#F1C27D", // Light Medium
  "#E0AC69", // Medium
  "#C68642", // Medium Dark
  "#8D5524", // Dark
  "#6B4423", // Deep
  "#4A2C17", // Very Deep
  "#F4E4D6"  // Pale
]

// Expanded hairstyles with better variety
const hairStyles = [
  { id: "short", name: "Short", description: "Classic short cut" },
  { id: "long", name: "Long", description: "Flowing long hair" },
  { id: "curly", name: "Curly", description: "Natural curls" },
  { id: "spiky", name: "Spiky", description: "Edgy spikes" },
  { id: "wavy", name: "Wavy", description: "Gentle waves" },
  { id: "braided", name: "Braided", description: "Elegant braids" },
  { id: "afro", name: "Afro", description: "Natural afro" },
  { id: "buzz-cut", name: "Buzz Cut", description: "Military style" },
  { id: "ponytail", name: "Ponytail", description: "High ponytail" },
  { id: "bob", name: "Bob", description: "Classic bob cut" },
  { id: "mohawk", name: "Mohawk", description: "Punk mohawk" },
  { id: "bald", name: "Bald", description: "No hair" }
]

// Natural hair colors
const hairColors = [
  "#2C1B18", // Black
  "#8B4513", // Brown
  "#D2691E", // Auburn
  "#DEB887", // Blonde
  "#B22222", // Red
  "#696969", // Gray
  "#FFFFFF", // White
  "#800080", // Fantasy Purple
  "#FF1493", // Hot Pink
  "#00CED1"  // Cyber Blue
]

// Natural eye colors
const eyeColors = [
  "#8B4513", // Brown
  "#4682B4", // Blue
  "#228B22", // Green
  "#2F4F4F", // Gray
  "#800080", // Violet
  "#000000", // Black
  "#DAA520", // Hazel
  "#008B8B"  // Teal
]

export function CharacterCreator({ 
  isOpen, 
  onComplete, 
  editMode = false,
  currentCharacter,
  currentUsername = "",
  onSave,
  onCancel 
}: CharacterCreatorProps) {
  const [username, setUsername] = useState(editMode ? currentUsername : "")
  const [character, setCharacter] = useState<CharacterCustomization>(
    currentCharacter || {
      skinColor: "#FDBCB4",
      hairStyle: "short",
      hairColor: "#8B4513",
      eyeColor: "#8B4513",
      equippedItems: {}
    }
  )
  const [previewAnimation, setPreviewAnimation] = useState<string>("idle")

  const handleComplete = () => {
    if (editMode && onSave) {
      onSave(character)
    } else if (username.trim() && onComplete) {
      onComplete(username, character)
    }
  }

  const ColorPicker = ({ colors, selected, onChange, label }: { 
    colors: string[], 
    selected: string, 
    onChange: (color: string) => void,
    label: string 
  }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium flex items-center space-x-2">
        <Palette className="h-4 w-4" />
        <span>{label}</span>
      </Label>
      <div className="flex space-x-2 flex-wrap gap-2">
        {colors.map(color => (
          <button
            key={color}
            className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
              selected === color ? 'border-cyber-blue shadow-lg' : 'border-muted hover:border-cyber-blue/50'
            }`}
            style={{ backgroundColor: color }}
            onClick={() => onChange(color)}
            title={`Select ${label.toLowerCase()}`}
          />
        ))}
      </div>
    </div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={editMode ? onCancel : () => {}}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent flex items-center space-x-2">
            {editMode ? (
              <>
                <Edit3 className="h-6 w-6 text-cyber-blue" />
                <span>Customize Your Avatar</span>
              </>
            ) : (
              <>
                <Sparkles className="h-6 w-6 text-cyber-blue" />
                <span>Create Your Cyber Agent</span>
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Character Preview */}
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <AnimatedAvatar 
                character={character} 
                size="xl" 
                animation={previewAnimation}
                showAnimationControls={true}
                onAnimationChange={setPreviewAnimation}
              />
              <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-cyber-blue/10 border-cyber-blue">
                {editMode ? "Preview" : "Your Agent"}
              </Badge>
            </div>
            
            {!editMode && (
              <div className="text-center space-y-2">
                <Label htmlFor="username">Agent Name</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your agent name"
                  className="max-w-xs text-center"
                  maxLength={20}
                />
              </div>
            )}
          </div>

          {/* Customization Options */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                <ColorPicker
                  colors={skinColors}
                  selected={character.skinColor}
                  onChange={(color) => setCharacter(prev => ({ ...prev, skinColor: color }))}
                  label="Skin Tone"
                />

                <div className="space-y-3">
                  <Label className="text-sm font-medium">Hair Style</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {hairStyles.map(style => (
                      <Button
                        key={style.id}
                        variant={character.hairStyle === style.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCharacter(prev => ({ ...prev, hairStyle: style.id }))}
                        className="text-xs h-auto py-2 px-2 flex flex-col items-center space-y-1"
                        title={style.description}
                      >
                        <span className="font-medium">{style.name}</span>
                        <span className="text-xs opacity-75">{style.description}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <ColorPicker
                  colors={hairColors}
                  selected={character.hairColor}
                  onChange={(color) => setCharacter(prev => ({ ...prev, hairColor: color }))}
                  label="Hair Color"
                />

                <ColorPicker
                  colors={eyeColors}
                  selected={character.eyeColor}
                  onChange={(color) => setCharacter(prev => ({ ...prev, eyeColor: color }))}
                  label="Eye Color"
                />
              </CardContent>
            </Card>

            <div className="flex space-x-4">
              <Button 
                onClick={handleComplete} 
                disabled={!editMode && !username.trim()}
                className="flex-1 bg-cyber-blue hover:bg-cyber-blue/80"
                size="lg"
              >
                {editMode ? "Save Changes" : "Enter CyberCop Academy"}
              </Button>
              
              {editMode && onCancel && (
                <Button 
                  onClick={onCancel}
                  variant="outline"
                  size="lg"
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
