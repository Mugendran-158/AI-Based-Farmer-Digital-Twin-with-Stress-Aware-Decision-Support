export const SEASONAL_DATA = {
    en: {
        RAINY: {
            label: "Monsoon / Tropical Wet",
            description: "High humidity and heavy rainfall. Ideal for water-intensive and tropical crops.",
            profatibility_note: "High yield potential but requires strict fungal and drainage management.",
            advisory: {
                general: "Maintain drainage channels to prevent waterlogging. Monitor for fungal outbreaks.",
                pest_alert: "Watch for Root Rot, Blast disease in Rice, and Mosquito-borne vectors.",
                water_tip: "Implement rainwater harvesting systems. Ensure bunds are secure.",
                government_scheme: "Global: Crop Insurance & Flood Relief Schemes active."
            },
            crops: [
                { name: "Rice (Paddy)", type: "Cereal", yield: "25-30 Quintals", price: "₹2,000 - ₹2,500/Q", yield_val: 28, price_min: 2000, price_max: 2500, image: "/src/assets/seasonal/wheat.png", soil: "Clayey / Clay-Loam", duration: "120-150 Days", grow_guide: "Sow in nursery. Transplant seedlings into puddled fields. Maintain 2-5cm water level." },
                { name: "Sugar Cane", type: "Cash", yield: "35-40 Tons", price: "₹3,000 - ₹3,500/T", yield_val: 38, price_min: 3000, price_max: 3500, image: "/src/assets/seasonal/oak.png", soil: "Deep Loam", duration: "10-14 Months", grow_guide: "Plant setts in furrows. Needs frequent irrigation and heavy fertilization." },
                { name: "Pigeon Pea (Tur)", type: "Pulse", yield: "8-10 Quintals", price: "₹6,500 - ₹7,500/Q", yield_val: 9, price_min: 6500, price_max: 7500, image: "🥣", soil: "Sandy Loam", duration: "150-180 Days", grow_guide: "Drought tolerant deep taproot. prevent waterlogging. Often intercropped." },
                { name: "Cassava (Yuca)", type: "Tuber", yield: "10-12 Tons", price: "₹15,000 - ₹18,000/T", yield_val: 11, price_min: 15000, price_max: 18000, image: "🥔", soil: "Sandy Loam", duration: "8-12 Months", grow_guide: "Plant stem cuttings. Very drought tolerant once established. Africa/S.America staple." },
                { name: "Taro (Dasheen)", type: "Tuber", yield: "8-10 Tons", price: "₹20,000 - ₹25,000/T", yield_val: 9, price_min: 20000, price_max: 25000, image: "🍠", soil: "Wet/Loam", duration: "9-12 Months", grow_guide: "Thrives in waterlogged soil. Propagate by corms. High starch source." },
                { name: "Cotton", type: "Fiber", yield: "10-12 Quintals", price: "₹7,000 - ₹8,500/Q", yield_val: 11, price_min: 7000, price_max: 8500, image: "☁️", soil: "Black Cotton Soil", duration: "150-180 Days", grow_guide: "Sow seeds in rows. Requires warm days and cool nights. Avoid waterlogging." },
                { name: "Jute", type: "Fiber", yield: "12-15 Quintals", price: "₹5,000 - ₹6,000/Q", yield_val: 13.5, price_min: 5000, price_max: 6000, image: "🧶", soil: "Alluvial", duration: "120-135 Days", grow_guide: "Sow in pre-monsoon. Harvest when pods appear. Requires retting in water." }
            ],
            fruits: [
                { name: "Banana", type: "Tropical", yield: "20-25 Tons", price: "₹15 - ₹25/kg", yield_val: 22.5, price_min: 15000, price_max: 25000, image: "🍌", soil: "Rich Loam", duration: "12-14 Months", grow_guide: "Plant suckers in pits. Needs heavy watering and wind protection." },
                { name: "Papaya", type: "Tropical", yield: "30-40 Tons", price: "₹20 - ₹30/kg", yield_val: 35, price_min: 20000, price_max: 30000, image: "🍈", soil: "Sandy Loam", duration: "9-10 Months", grow_guide: "Transplant seedlings. Sensitive to waterlogging. Fruits quickly." },
                { name: "Dragon Fruit", type: "Exotic", yield: "5-6 Tons", price: "₹150 - ₹250/kg", yield_val: 5.5, price_min: 150000, price_max: 250000, image: "🐉", soil: "Sandy / Well-drained", duration: "2-3 Years", grow_guide: "Uses cactus supports. Needs sun but handled drainage carefully." },
                { name: "Jackfruit", type: "Tropical", yield: "15-20 Tons", price: "₹30 - ₹50/kg", yield_val: 17.5, price_min: 30000, price_max: 50000, image: "🍈", soil: "Deep Loam", duration: "3-4 Years", grow_guide: "Largest tree fruit. Needs space. Sensitive to frost." },
                { name: "Rambutan", type: "Exotic", yield: "2-3 Tons", price: "₹200 - ₹400/kg", yield_val: 2.5, price_min: 200000, price_max: 400000, image: "🔴", soil: "Clay Loam", duration: "5-6 Years", grow_guide: "Strictly tropical. High humidity required. Grafted trees preferred." }
            ],
            vegetables: [
                { name: "Okra", type: "Veg", yield: "High", price: "Standard", image: "🥬", soil: "Sandy Loam", duration: "60-90 Days", grow_guide: "Direct sowing. Thrives in heat and humidity. Harvest pods young." },
                { name: "Eggplant (Brinjal)", type: "Veg", yield: "High", price: "Standard", image: "🍆", soil: "Silt Loam", duration: "100-120 Days", grow_guide: "Transplant seedlings. Key pest: Fruit Borer. Keep soil moist." },
                { name: "Bamboo Shoots", type: "Veg", yield: "Seasonal", price: "Premium", image: "🎍", soil: "Rich Loam", duration: "Perennial", grow_guide: "Harvest young shoots in monsoon. Cover with soil to keep tender." },
                { name: "Bitter Gourd", type: "Veg", yield: "Medium", price: "Healthy", image: "🥒", soil: "Sandy Loam", duration: "60-70 Days", grow_guide: "Grow on trellises. Pollination is key. Bitter but hardy." }
            ],
            nuts: [
                { name: "Groundnut (Peanut)", type: "Legume", yield: "High", price: "Commodity", image: "🥜", soil: "Sandy / Loose", duration: "100-120 Days", grow_guide: "Sow seeds. Earth up soil around pegs. Do not disturb roots." },
                { name: "Coconut", type: "Palm", yield: "Cont.", price: "Global", image: "🥥", soil: "Coastal Sand", duration: "5-7 Years", grow_guide: "Salt tolerant. Requires full sun and high humidity." }
            ],
            leaves: [
                { name: "Curry Leaves", type: "Herb", yield: "Cont.", price: "Steady", image: "🌿", soil: "Red / Loam", duration: "Perennial", grow_guide: "Plant saplings. Prune regularly to encourage bushiness." },
                { name: "Water Spinach", type: "Leafy", yield: "V. High", price: "Local", image: "🥗", soil: "Wet/Mud", duration: "30 Days", grow_guide: "Aquatic or semi-aquatic. Harvest stems/leaves continuously." }
            ],
            medicinal: [
                { name: "Aloe Vera", type: "Succulent", yield: "High", price: "Good", image: "🌵", soil: "Sandy", duration: "18-24 Months", grow_guide: "Plant offsets/pups. Minimal water needed. Harvest mature leaves." },
                { name: "Turmeric", type: "Rhizome", yield: "Medium", price: "High", image: "🧡", soil: "Loam", duration: "8-9 Months", grow_guide: "Plant rhizomes. Shade tolerant. Harvest when leaves turn yellow." },
                { name: "Moringa", type: "Tree", yield: "Super", price: "Global", image: "🌳", soil: "Sandy/Poor", duration: "6-8 Months", grow_guide: "Miracle tree. Drought resistant. Harvest leaves and pods." }
            ],
            grass: [
                { name: "Napier Grass", type: "Fodder", yield: "V. High", price: "Low", image: "🌾", soil: "Fertile Loam", duration: "50 Days (Cut)", grow_guide: "Plant stem cuttings. Fast growing heavy feeder. Cut intervals key." }
            ]
        },
        // Additional seasons (SUMMER, WINTER, AUTUMN) would follow the same pattern
        // For now, copying the existing structure temporarily
        SUMMER: {
            label: "Summer / Temperate Warm",
            description: "Warm, long days with strong sun. Ideal for fruiting crops and vegetables.",
            profatibility_note: "Requires consistent irrigation. High market demand for fresh produce.",
            advisory: {
                general: "Mulch heavily to retain soil moisture. Schedule irrigation for early morning.",
                pest_alert: "Monitor for Aphids, Thrips, and Spider Mites in hot conditions.",
                water_tip: "Use drip irrigation to maximize water efficiency.",
                government_scheme: "Subsidies available for Solar Pumps and Micro-Irrigation."
            },
            crops: [
                { name: "Corn (Maize)", type: "Cereal", yield: "20-25 Quintals", price: "₹1,800 - ₹2,200/Q", yield_val: 22.5, price_min: 1800, price_max: 2200, image: "🌽", soil: "Loam", duration: "90-110 Days", grow_guide: "Direct sow in blocks used for wind pollination. Needs nitrogen." },
                { name: "Soybean", type: "Legume", yield: "10-12 Quintals", price: "₹4,000 - ₹4,500/Q", yield_val: 11, price_min: 4000, price_max: 4500, image: "🌱", soil: "Loam", duration: "90-100 Days", grow_guide: "Inoculate seeds. Nitrogen fixer. Good rotation crop." },
                { name: "Black Gram (Urad)", type: "Pulse", yield: "6-8 Quintals", price: "₹6,000 - ₹7,000/Q", yield_val: 7, price_min: 6000, price_max: 7000, image: "🌑", soil: "Heavy Loam/Clay", duration: "70-80 Days", grow_guide: "Short duration catch crop. Needs heat. Improves soil fertility." },
                { name: "Sunflower", type: "Oilseed", yield: "8-10 Quintals", price: "₹3,500 - ₹4,200/Q", yield_val: 9, price_min: 3500, price_max: 4200, image: "🌻", soil: "Any", duration: "80-100 Days", grow_guide: "Sow directly. Heads follow sun. Harvest when back of head turns yellow." },
                { name: "Millet", type: "Cereal", yield: "12-15 Quintals", price: "₹2,500 - ₹3,000/Q", yield_val: 13.5, price_min: 2500, price_max: 3000, image: "🥣", soil: "Poor/Sandy", duration: "70-100 Days", grow_guide: "Ancient grain. Highly drought resistant. Requires little input." }
            ],
            fruits: [
                { name: "Watermelon", type: "Melon", yield: "15-20 Tons", price: "₹10,000 - ₹12,000/T", yield_val: 18, price_min: 10000, price_max: 12000, image: "🍉", soil: "Sandy Loam", duration: "80-100 Days", grow_guide: "Needs space to vine. Heavy feeder/drinker. Tap to check ripeness." },
                { name: "Mango", type: "King Fruit", yield: "8-10 Tons", price: "₹40,000 - ₹60,000/T", yield_val: 9, price_min: 40000, price_max: 60000, image: "/src/assets/seasonal/oak.png", soil: "Alluvial / Laterite", duration: "Perennial", grow_guide: "Grafting preferred. Alternate beering. Deep watering in summer." },
                { name: "Peach", type: "Stone", yield: "Medium", price: "High", image: "🍑", soil: "Sand/Loam", duration: "3-4 Years", grow_guide: "Prune for open center. Thin fruit for size. Needs drainage." },
                { name: "Lychee", type: "Subtropical", yield: "Seasonal", price: "High", image: "🍒", soil: "Acidic Loam", duration: "Perennial", grow_guide: "Needs cool winters dry/warm summers. Delicate harvest." }
            ],
            vegetables: [
                { name: "Tomato", type: "Solanaceous", yield: "High", price: "Varied", image: "🍅", soil: "Loam", duration: "70-90 Days", grow_guide: "Stake needed. Prune suckers. Consistent water to avoid splitting." },
                { name: "Cucumber", type: "Cucurbit", yield: "High", price: "Steady", image: "🥒", soil: "Loam", duration: "50-70 Days", grow_guide: "Trellis for straight fruit. Harvest daily once producing." },
                { name: "Zucchini", type: "Squash", yield: "V. High", price: "Steady", image: "🥒", soil: "Loam", duration: "45-55 Days", grow_guide: "Prolific producer. Harvest small for best quality. Watch for powdery mildew." },
                { name: "Bell Pepper", type: "Solanaceous", yield: "Medium", price: "High", image: "🫑", soil: "Loam", duration: "60-90 Days", grow_guide: "Needs heat. Hardening off transplants is crucial. Support plants." }
            ],
            nuts: [
                { name: "Almond", type: "Nut", yield: "Annual", price: "Premium", image: "🌰", soil: "Deep Loam", duration: "Perennial", grow_guide: "Needs cross-pollination. Shake trees to harvest." },
                { name: "Cashew", type: "Nut", yield: "Medium", price: "Export", image: "🥜", soil: "Sandy/Laterite", duration: "3 Years", grow_guide: "Hardy tree. Fruit (Apple) is also edible. Nut has toxic shell liquid." }
            ],
            leaves: [
                { name: "Spinach (Summer)", type: "Leafy", yield: "Medium", price: "Good", image: "🍃", soil: "Loam", duration: "40-50 Days", grow_guide: "Bolt resistant varieties needed. Partial shade in peak heat." },
                { name: "Amaranth", type: "Leafy", yield: "High", price: "Local", image: "🥬", soil: "Loam", duration: "30-40 Days", grow_guide: "Heat loving. Cut-and-come-again harvesting. Very nutritious." }
            ],
            medicinal: [
                { name: "Lavender", type: "Aromatic", yield: "Medium", price: "Oil", image: "🪻", soil: "Sandy/Alkaline", duration: "Perennial", grow_guide: "Needs drainage. Do not overwater. Prune after flowering." }
            ],
            grass: [
                { name: "Sudan Grass", type: "Fodder", yield: "High", price: "Feed", image: "🌾", soil: "Loam", duration: "60 Days", grow_guide: "Broadcast seeds. Drought tolerant once established." }
            ]
        },
        WINTER: {
            label: "Winter / Cool Temperate",
            description: "Cold to freezing temperatures. Ideal for hardy cereals and root vegetables.",
            profatibility_note: "Lower input costs for pest control. Stable commodity prices.",
            advisory: {
                general: "Use row covers or greenhouses for frost protection. Prune dormant fruit trees.",
                pest_alert: "Low pest activity, but watch for storage rot in harvested crops.",
                water_tip: "Reduce irrigation frequency. Water deeply before freezes to insulate roots.",
                government_scheme: "Winter Wheat & Barley procurement programs."
            },
            crops: [
                { name: "Wheat", type: "Cereal", yield: "18-22 Quintals", price: "₹2,100 - ₹2,400/Q", yield_val: 20, price_min: 2100, price_max: 2400, image: "🍞", soil: "Loam / Clay", duration: "110-130 Days", grow_guide: "Sow in autumn/winter. Needs cool growth, warm harvest season." },
                { name: "Chickpea (Gram)", type: "Pulse", yield: "8-10 Quintals", price: "₹5,000 - ₹5,500/Q", yield_val: 9, price_min: 5000, price_max: 5500, image: "🧆", soil: "Clay Loam", duration: "100-110 Days", grow_guide: "Deep sowing needed. Nip fresh growth to branching. Frost sensitive flowering." },
                { name: "Lentil (Masoor)", type: "Pulse", yield: "6-8 Quintals", price: "₹6,000 - ₹6,500/Q", yield_val: 7, price_min: 6000, price_max: 6500, image: "🥣", soil: "Light Loam", duration: "110-130 Days", grow_guide: "Hardy dryland crop. Can grow on residual moisture. nitrogen fixer." },
                { name: "Mustard", type: "Oilseed", yield: "7-9 Quintals", price: "₹5,000 - ₹5,800/Q", yield_val: 8, price_min: 5000, price_max: 5800, image: "🌼", soil: "Sandy Loam", duration: "100-110 Days", grow_guide: "Broadcast sowing. Low water requirement. Harvest when pods yellow." },
                { name: "Barley", type: "Cereal", yield: "15-18 Quintals", price: "₹1,600 - ₹1,800/Q", yield_val: 16.5, price_min: 1600, price_max: 1800, image: "🍺", soil: "Loam", duration: "60-70 Days", grow_guide: "Salt tolerant. Used for malting or fodder. Fast maturity." }
            ],
            fruits: [
                { name: "Orange", type: "Citrus", yield: "12-15 Tons", price: "₹25,000 - ₹35,000/T", yield_val: 13.5, price_min: 25000, price_max: 35000, image: "/src/assets/seasonal/apple.png", soil: "Loam", duration: "Perennial", grow_guide: "Needs frost protection if severe. Moderate feeder." },
                { name: "Apple", type: "Pome", yield: "10-12 Tons", price: "₹80,000 - ₹1,20,000/T", yield_val: 11, price_min: 80000, price_max: 120000, image: "/src/assets/seasonal/apple.png", soil: "Loam", duration: "Perennial", grow_guide: "Chill hours required in winter for bud set. Prune in dormancy." },
                { name: "Strawberry", type: "Berry", yield: "High", price: "Premium", image: "🍓", soil: "Sandy Loam", duration: "Season", grow_guide: "Plant runners. Mulch with straw to keep fruit clean. Needs sun." },
                { name: "Kiwi", type: "Vine", yield: "High", price: "Premium", image: "🥝", soil: "Loam", duration: "3-4 Years", grow_guide: "Vigorous vine needs strong trellis. Male and female plants needed." }
            ],
            vegetables: [
                { name: "Potato", type: "Tuber", yield: "V. High", price: "Staple", image: "🥔", soil: "Loose Loamy", duration: "90-120 Days", grow_guide: "Plant seed tubers. Hilling required to cover tubers. Water steady." },
                { name: "Carrot", type: "Root", yield: "High", price: "Steady", image: "🥕", soil: "Sandy (Stone-free)", duration: "70-80 Days", grow_guide: "Fine soil needed for straight roots. Thin seedlings early." },
                { name: "Cauliflower", type: "Brassica", yield: "Medium", price: "High", image: "🥦", soil: "Rich Loam", duration: "90-110 Days", grow_guide: "Blanch heads by covering with leaves. Sensitive to heat spikes." },
                { name: "Bok Choy", type: "Brassica", yield: "High", price: "Niche", image: "🥬", soil: "Rich Loam", duration: "45-50 Days", grow_guide: "Asian green. Prefers cool weather. Harvest whole head or leaves." },
                { name: "Daikon Radish", type: "Root", yield: "High", price: "Steady", image: "⚪", soil: "Deep Sand/Loam", duration: "60-70 Days", grow_guide: "Deep tillage needed. Grows very large. Winter staple in East Asia." }
            ],
            nuts: [
                { name: "Walnut", type: "Nut", yield: "Annual", price: "High", image: "🧠", soil: "Deep Loam", duration: "Perennial", grow_guide: "Deep taproot. Needs space. Harvest when hulls crack." }
            ],
            leaves: [
                { name: "Spinach", type: "Leafy", yield: "High", price: "Fresh", image: "🍃", soil: "Rich Loam", duration: "40-50 Days", grow_guide: "Thrives in cool weather. Harvest outer leaves continuously." },
                { name: "Mustard Greens", type: "Leafy", yield: "High", price: "Local", image: "🥬", soil: "Loam", duration: "30-40 Days", grow_guide: "Spicy flavor. Very fast growing. Cut-and-come-again." }
            ],
            medicinal: [
                { name: "Ginseng", type: "Root", yield: "Low", price: "Luxury", image: "🥕", soil: "Forest Loam", duration: "5-7 Years", grow_guide: "Shade required. Very slow growing. High value root." },
                { name: "Saffron", type: "Stigma", yield: "Tiny", price: "Gold", image: "🧧", soil: "Calcareous", duration: "Perennial", grow_guide: "Plant corms. Harvest stigmas (threads) manually at dawn." },
                { name: "Ashwagandha", type: "Root", yield: "Medium", price: "Wellness", image: "⚕️", soil: "Sandy Loam", duration: "150-180 Days", grow_guide: "Drought tolerant. Harvest roots when berries turn red." }
            ],
            grass: [
                { name: "Ryegrass", type: "Cover", yield: "High", price: "Forage", image: "🌾", soil: "Clay/Loam", duration: "Annual", grow_guide: "Fast germination. Excellent winter cover crop." }
            ]
        },
        AUTUMN: {
            label: "Autumn / Harvest",
            description: "Cooling temperatures. Major harvest season for fruits, nuts, and vines.",
            profatibility_note: "Peak supply time; consider storage or processing for better margins.",
            advisory: {
                general: "Complete harvests before first frost. Prepare soil for winter cover crops.",
                pest_alert: "Manage crop residue to prevent pest overwintering.",
                water_tip: "Reduce water as plants go dormant.",
                government_scheme: "Subsidies for Storage Silos and Cold Chains."
            },
            crops: [
                { name: "Quinoa", type: "Grain", yield: "5-7 Quintals", price: "₹15,000 - ₹18,000/Q", yield_val: 6, price_min: 15000, price_max: 18000, image: "🥣", soil: "Sandy Loam", duration: "90-120 Days", grow_guide: "Drought tolerant. Avoid waterlogging. Harvest when grain hardens." },
                { name: "Buckwheat", type: "Cover/Grain", yield: "4-6 Quintals", price: "₹8,000 - ₹10,000/Q", yield_val: 5, price_min: 8000, price_max: 10000, image: "🌾", soil: "Poor Soil OK", duration: "70-90 Days", grow_guide: "Fast growing. Good pollinator attractor. Harvest before shattering." },
                { name: "Yam", type: "Tuber", yield: "8-10 Tons", price: "₹25,000 - ₹30,000/T", yield_val: 9, price_min: 25000, price_max: 30000, image: "🍠", soil: "Loose Loam", duration: "8-10 Months", grow_guide: "Staking required for vines. Africa/Caribbean staple. Harvest when leaves yellow." }
            ],
            fruits: [
                { name: "Grape (Wine)", type: "Vine", yield: "Vintage", price: "Varies", image: "🍇", soil: "Rocky/Drained", duration: "Perennial", grow_guide: "Pruning key. Monitor sugar levels (Brix) for harvest timing." },
                { name: "Pomegranate", type: "Exotic", yield: "Medium", price: "High", image: "🍎", soil: "Loam", duration: "Perennial", grow_guide: "Drought hardy. Fruit cracking is main issue to manage." },
                { name: "Persimmon", type: "Exotic", yield: "High", price: "Rising", image: "🟠", soil: "Loam", duration: "Perennial", grow_guide: "Astringent vs Non-astringent varieties. Harvest when fully colored." },
                { name: "Cranberry", type: "Berry", yield: "High", price: "Holiday", image: "🔴", soil: "Acidic Peat", duration: "Perennial", grow_guide: "Grown in bogs. Needs sandy acidic soil. Flooded for harvest." }
            ],
            vegetables: [
                { name: "Pumpkin", type: "Squash", yield: "High", price: "Seasonal", image: "🎃", soil: "Rich Loam", duration: "100-120 Days", grow_guide: "Needs much space. Place fruit on board to prevent rot. Harvest fully orange." },
                { name: "Sweet Potato", type: "Tuber", yield: "Peak", price: "Staple", image: "🍠", soil: "Sandy", duration: "100-120 Days", grow_guide: "Plant slips. Heat lover. Harvest before frost." },
                { name: "Brussels Sprouts", type: "Brassica", yield: "Medium", price: "High", image: "🟢", soil: "Clay Loam", duration: "90-100 Days", grow_guide: "Long growing season. Frost improves flavor. Snap off lower sprouts first." }
            ],
            nuts: [
                { name: "Pecan", type: "Nut", yield: "High", price: "Good", image: "🥧", soil: "Deep Loam", duration: "Perennial", grow_guide: "Zinc foliar sprays often needed. Large trees." },
                { name: "Hazelnut", type: "Nut", yield: "Medium", price: "Global", image: "🌰", soil: "Loam", duration: "Perennial", grow_guide: "Bush or tree form. Sucker control needed. Harvest from ground." }
            ],
            leaves: [
                { name: "Kale", type: "Brassica", yield: "High", price: "Hardy", image: "🥬", soil: "Loam", duration: "50-60 Days", grow_guide: "Frost improves flavor (sweeter). Harvest lower leaves." },
                { name: "Chard", type: "Leafy", yield: "High", price: "Steady", image: "🥬", soil: "Loam", duration: "50-60 Days", grow_guide: "Rainbow stems. Very ornamental. Harvest outer leaves." }
            ],
            medicinal: [
                { name: "Valerian", type: "Root", yield: "Medium", price: "Sleep", image: "🌿", soil: "Wet Loam", duration: "Perennial", grow_guide: "Harvest roots in autumn of second year. Wash thoroughly." },
                { name: "Echinacea", type: "Root/Flower", yield: "Medium", price: "Immunity", image: "🌸", soil: "Well-drained", duration: "Perennial", grow_guide: "Purple Coneflower. Drought tolerant. Harvest roots after 3 years." }
            ],
            grass: [
                { name: "Timothy Grass", type: "Hay", yield: "Medium", price: "Horse Feed", image: "🌾", soil: "Cool/Wet", duration: "Perennial", grow_guide: "Best for hay. Cut before flowering for best quality." }
            ]
        }
    },
    // Tamil translations
    ta: {
        RAINY: {
            label: "பருவமழை / வெப்பமண்டல ஈரப்பதம்",
            description: "அதிக ஈரப்பதம் மற்றும் கனமழை. நீர் தேவைப்படும் மற்றும் வெப்பமண்டல பயிர்களுக்கு ஏற்றது.",
            profatibility_note: "அதிக விளைச்சல் சாத்தியம் ஆனால் பூஞ்சை மற்றும் வடிகால் மேலாண்மை தேவை.",
            advisory: {
                general: "நீர் தேங்குவதைத் தடுக்க வடிகால் வாய்க்கால்களை பராமரிக்கவும்.",
                pest_alert: "நெல்லில் வேர் அழுகல், வெடிப்பு நோய் மற்றும் கொசு பரவும் வைரஸ்களைக் கவனிக்கவும்.",
                water_tip: "மழைநீர் சேகரிப்பு அமைப்புகளை செயல்படுத்தவும்.",
                government_scheme: "உலகளாவிய: பயிர் காப்பீடு மற்றும் வெள்ள நிவாரண திட்டங்கள்."
            },
            crops: [
                { name: "நெல் (நெற்பயிர்)", type: "தானியம்", yield: "அதிகம்", price: "நிலையான", image: "🌾", soil: "களிமண் / களி கலந்த களிமண்", duration: "120-150 நாட்கள்", grow_guide: "நாற்றுப் படுக்கையில் விதைக்கவும். நாற்றுகளை சேற்று வயலில் நட வும். 2-5 செ.மீ நீர்மட்டம் பராமரிக்கவும்." },
                { name: "கரும்பு", type: "பணப்பயிர்", yield: "மிக அதிகம்", price: "உலகம்", image: "🎋", soil: "ஆழமான களிமண்", duration: "10-14 மாதங்கள்", grow_guide: "கன்றுகளை உரோவில் நடவும். அடிக்கடி நீர்ப்பாசனம் மற்றும் அதிக உரம் தேவை." },
                { name: "துவரை பருப்பு", type: "பருப்பு வகை", yield: "நடுத்தரம்", price: "அதிகம்", image: "🥣", soil: "மணல் கலந்த களிமண்", duration: "150-180 நாட்கள்", grow_guide: "வறட்சி எதிர்ப்பு ஆழமான வேர். நீர் தேங்குவதைத் தவிர்க்கவும்." },
                { name: "மரவள்ளிக்கிழங்கு", type: "கிழங்கு", yield: "அதிகம்", price: "முக்கிய உணவு", image: "🥔", soil: "மணல் கலந்த களிமண்", duration: "8-12 மாதங்கள்", grow_guide: "தண்டு வெட்டுகளை நடவும். நிறுவப்பட்ட பின் வறட்சி எதிர்ப்பு." },
                { name: "சேப்பங்கிழங்கு", type: "கிழங்கு", yield: "அதிகம்", price: "உள்ளூர்", image: "🍠", soil: "ஈரம் / களிமண்", duration: "9-12 மாதங்கள்", grow_guide: "நீர் தேங்கிய மண்ணில் செழிக்கும். கிழங்குகள் மூலம் இனப்பெருக்கம்." },
                { name: "பருத்தி", type: "நார் பயிர்", yield: "நடுத்தரம்", price: "ஏற்ற இறக்கம்", image: "☁️", soil: "கரு குருத்தி மண்", duration: "150-180 நாட்கள்", grow_guide: "வரிசையாக விதைக்கவும். நீர் தேங்குவதைத் தவிர்க்கவும்." },
                { name: "சணல்", type: "நார் பயிர்", yield: "அதிகம்", price: "பிராந்திய", image: "🧶", soil: "வண்டல் மண்", duration: "120-135 நாட்கள்", grow_guide: "முன் பருவமழைக்கு விதைக்கவும். காய்கள் தோன்றும்போது அறுவடை செய்யவும்." }
            ],
            fruits: [
                { name: "வாழை", type: "வெப்பமண்டலம்", yield: "தொடர்ச்சி", price: "நிலையான", image: "🍌", soil: "வளமான களிமண்", duration: "12-14 மாதங்கள்", grow_guide: "குழியில் கன்றுகளை நடவும். அதிக நீர்ப்பாசனம்  மற்றும் காற்று பாதுகாப்பு தேவை." },
                { name: "பப்பாளி", type: "வெப்பமண்டலம்", yield: "அதிகம்", price: "நெகிழ்வான", image: "🍈", soil: "மணல் கலந்த களிமண்", duration: "9-10 மாதங்கள்", grow_guide: "நாற்றுகளை மாற்றி நடவும். நீர் தேங்குவதற்கு உணர்திறன்." },
                { name: "டிராகன் பழம்", type: "அரிதான", yield: "நடுத்தரம்", price: "விலை உயர்ந்த", image: "🐉", soil: "மணல் / நல்ல வடிகால்", duration: "2-3 ஆண்டுகள்", grow_guide: "கற்றாழை தாங்கிகளைப் பயன்படுத்துகிறது. சூரிய ஒளி தேவை." },
                { name: "பலாப்பழம்", type: "வெப்பமண்டலம்", yield: "மிக அதிகம்", price: "உயரும்", image: "🍈", soil: "ஆழமான களிமண்", duration: "3-4 ஆண்டுகள்", grow_guide: "மிகப்பெரிய மரப்பழம். இடம் தேவை. உறைபனிக்கு உணர்திறன்." },
                { name: "இராம்புட்டான்", type: "அரிதான", yield: "நடுத்தரம்", price: "ஏற்றுமதி", image: "🔴", soil: "களி களிமண்", duration: "5-6 ஆண்டுகள்", grow_guide: "கண்டிப்பாக வெப்பமண்டலம். அதிக ஈரப்பதம் தேவை." }
            ],
            vegetables: [
                { name: "வெண்டைக்காய்", type: "காய்கறி", yield: "அதிகம்", price: "நிலையான", image: "🥬", soil: "மணல் கலந்த களிமண்", duration: "60-90 நாட்கள்", grow_guide: "நேரடி விதைப்பு. வெப்பம் மற்றும் ஈரப்பதத்தில் செழிக்கும்." },
                { name: "கத்தரிக்காய்", type: "காய்கறி", yield: "அதிகம்", price: "நிலையான", image: "🍆", soil: "வண்டல் களிமண்", duration: "100-120 நாட்கள்", grow_guide: "நாற்றுகளை மாற்றி நடவும். முக்கிய பூச்சி: காய் துளைப்பான். மண் ஈரமாக வைக்கவும்." },
                { name: "மூங்கில் தளிர்கள்", type: "காய்கறி", yield: "பருவகால", price: "விலை உயர்ந்த", image: "🎍", soil: "வளமான களிமண்", duration: "பல ஆண்டு", grow_guide: "பருவமழையில் இளம் தளிர்களை அறுவடை செய்யவும்." },
                { name: "பாகற்காய்", type: "காய்கறி", yield: "நடுத்தரம்", price: "ஆரோக்கியம்", image: "🥒", soil: "மணல் கலந்த களிமண்", duration: "60-70 நாட்கள்", grow_guide: "படர்கொடி ஆதரவில் வளர்க்கவும். மகரந்தச் சேர்க்கை முக்கியம்." }
            ],
            nuts: [
                { name: "நிலக்கடலை", type: "பருப்பு வகை", yield: "அதிகம்", price: "பொருட்பண்டம்", image: "🥜", soil: "மணல் / தளர்வான", duration: "100-120 நாட்கள்", grow_guide: "விதைக்கவும். ஆப்புகளைச் சுற்றி மண் சேர்க்கவும்." },
                { name: "தேங்காய்", type: "பனை மரம்", yield: "தொடர்ச்சி", price: "உலகம்", image: "🥥", soil: "கடலோர மணல்", duration: "5-7 ஆண்டுகள்", grow_guide: "உப்பு சகிப்புத்தன்மை. முழு சூரிய ஒளி தேவை." }
            ],
            leaves: [
                { name: "கறிவேப்பிலை", type: "மூலிகை", yield: "தொடர்ச்சி", price: "நிலையான", image: "🌿", soil: "சிவப்பு / களிமண்", duration: "பல ஆண்டு", grow_guide: "நாற்றுகளை நடவும். அடர்த்தியை ஊக்குவிக்க வெட்டவும்." },
                { name: "நீர் கீரை", type: "இலைக் காய்", yield: "மிக அதிகம்", price: "உள்ளூர்", image: "🥗", soil: "ஈரம் / சேறு", duration: "30 நாட்கள்", grow_guide: "நீர்வாழ் அல்லது அரை நீர்வாழ். தொடர்ந்து அறுவடை." }
            ],
            medicinal: [
                { name: "கற்றாழை", type: "சதைப்பற்று செடி", yield: "அதிகம்", price: "நல்ல", image: "🌵", soil: "மணல்", duration: "18-24 மாதங்கள்", grow_guide: "குட்டிகளை நடவும். குறைந்த நீர் தேவை." },
                { name: "மஞ்சள்", type: "வேர்த்தண்டுக்கிழங்கு", yield: "நடுத்தரம்", price: "அதிகம்", image: "🧡", soil: "களிமண்", duration: "8-9 மாதங்கள்", grow_guide: "வேர்த்தண்டுக்கிழங்குகளை நடவும். இலைகள் மஞ்சளாகும்போது அறுவடை." },
                { name: "முருங்கை", type: "மரம்", yield: "சூப்பர்", price: "உலகம்", image: "🌳", soil: "மணல் / ஏழை", duration: "6-8 மாதங்கள்", grow_guide: "அதிசய மரம். வறட்சி எதிர்ப்பு. இலைகள் மற்றும் காய்களை அறுவடை." }
            ],
            grass: [
                { name: "நேப்பியர் புல்", type: "தீவனம்", yield: "மிக அதிகம்", price: "குறைவு", image: "🌾", soil: "வளமான களிமண்", duration: "50 நாட்கள் (வெட்டு)", grow_guide: "தண்டு வெட்டுகளை நடவும். வேகமாக வளரும்." }
            ]
        },
        SUMMER: {
            label: "கோடை / மிதவெப்ப வெம்மை",
            description: "வெப்பமான, நீண்ட நாட்கள் வலுவான சூரியன். பழப்பயிர்கள் மற்றும் காய்கறிகளுக்கு ஏற்றது.",
            profatibility_note: "நிலையான நீர்ப்பாசனம் தேவை. புதிய விளைபொருட்களுக்கு அதிக சந்தைத் தேவை.",
            advisory: {
                general: "மண் ஈரப்பதத்தைத் தக்கவைக்க மல்ச் போடவும்.",
                pest_alert: "வெப்பமான நிலைமைகளில் அசுவினிகள், த்ரிப்ஸ், சிலந்தி பூச்சிகளைக் கண்காணிக்கவும்.",
                water_tip: "நீர் திறனை அதிகரிக்க சொட்டு நீர் பாசனத்தைப் பயன்படுத்தவும்.",
                government_scheme: "சூரிய குழாய்களுக்கு மானியம் மற்றும் குறு நீர்ப்பாசனம்."
            },
            crops: [
                { name: "மக்காச்சோளம்", type: "தானியம்", yield: "அதிகம்", price: "பொருட்பண்டம்", image: "🌽", soil: "களிமண்", duration: "90-110 நாட்கள்", grow_guide: "காற்று மகரந்தச் சேர்க்கைக்கு தொகுதிகளில் நேரடியாக விதைக்கவும்." },
                { name: "சோயாபீன்", type: "பருப்பு வகை", yield: "அதிகம்", price: "உலகம்", image: "🌱", soil: "களிமண்", duration: "90-100 நாட்கள்", grow_guide: "விதைகளை தடுப்பூசி செய்யவும். நைட்ரஜன் நிர்ணயம்." },
                { name: "உளுந்து", type: "பருப்பு", yield: "நடுத்தரம்", price: "நிலையான", image: "🌑", soil: "கனமான களிமண்", duration: "70-80 நாட்கள்", grow_guide: "குறுகிய காலப் பயிர். வெப்பம் தேவை. மண் வளத்தை மேம்படுத்துகிறது." },
                { name: "சூரியகாந்தி", type: "எண்ணெய் வித்து", yield: "நடுத்தரம்", price: "நல்ல", image: "🌻", soil: "ஏதேனும்", duration: "80-100 நாட்கள்", grow_guide: "நேரடியாக விதைக்கவும். தலைகள் சூரியனைப் பின்தொடரும்." },
                { name: "தினை", type: "தானியம்", yield: "நடுத்தரம்", price: "சூப்பர் தானியம்", image: "🥣", soil: "ஏழை / மணல்", duration: "70-100 நாட்கள்", grow_guide: "பண்டைய தானியம். மிகவும் வறட்சி எதிர்ப்பு." }
            ],
            fruits: [
                { name: "தர்பூசணி", type: "முலாம்பழம்", yield: "அதிகம்", price: "பருவகால", image: "🍉", soil: "மணல் கலந்த களிமண்", duration: "80-100 நாட்கள்", grow_guide: "படரவிடலாம். அதிக உரம் மற்றும் நீர் தேவை." },
                { name: "மாம்பழம்", type: "ராஜா பழம்", yield: "அதிகம்", price: "விலை உயர்ந்த", image: "🥭", soil: "வண்டல் / லேட்டரைட்", duration: "பல ஆண்டு", grow_guide: "ஒட்டு முறை விரும்பத்தக்கது. கோடையில் ஆழமான நீர்ப்பாசனம்." },
                { name: "பீச்", type: "கல் பழம்", yield: "நடுத்தரம்", price: "அதிகம்", image: "🍑", soil: "மணல் / களிமண்", duration: "3-4 ஆண்டுகள்", grow_guide: "திறந்த மையத்திற்கு கத்தரிக்கவும்." },
                { name: "லிச்சி", type: "துணை வெப்பமண்டலம்", yield: "பருவகால", price: "அதிகம்", image: "🍒", soil: "அமில களிமண்", duration: "பல ஆண்டு", grow_guide: "குளிர் குளிர்காலம் தேவை. மென்மையான அறுவடை." }
            ],
            vegetables: [
                { name: "தக்காளி", type: "சோலநேசியஸ்", yield: "அதிகம்", price: "மாறுபட்ட", image: "🍅", soil: "களிமண்", duration: "70-90 நாட்கள்", grow_guide: "ஆதரவு தேவை. அடுக்குகளை கத்தரிக்கவும்." },
                { name: "வெள்ளரிக்காய்", type: "குகுர்பிட்", yield: "அதிகம்", price: "நிலையான", image: "🥒", soil: "களிமண்", duration: "50-70 நாட்கள்", grow_guide: "படலி ஆதரவு நேராக பழங்களுக்கு. தினமும் அறுவடை." },
                { name: "சூ சினி", type: "பூசணி", yield: "மிக அதிகம்", price: "நிலையான", image: "🥒", soil: "களிமண்", duration: "45-55 நாட்கள்", grow_guide: "அதிக உற்பத்தி. சிறியதாக அறுவடை சிறந்த தரத்திற்கு." },
                { name: "குடைமிளகாய்", type: "சோலநேசியஸ்", yield: "நடுத்தரம்", price: "அதிகம்", image: "🫑", soil: "களிமண்", duration: "60-90 நாட்கள்", grow_guide: "வெப்பம் தேவை. ஆதரவு செடிகள்." }
            ],
            nuts: [
                { name: "பாதாம்", type: "கொட்டை", yield: "ஆண்டுதோறும்", price: "விலை உயர்ந்த", image: "🌰", soil: "ஆழமான களிமண்", duration: "பல ஆண்டு", grow_guide: "குறுக்கு மகரந்தச் சேர்க்கை தேவை." },
                { name: "முந்திரி", type: "கொட்டை", yield: "நடுத்தரம்", price: "ஏற்றுமதி", image: "🥜", soil: "மணல் / லேட்டரைட்", duration: "3 ஆண்டுகள்", grow_guide: "வலிமையான மரம். பழம் உண்ணக்கூடியது." }
            ],
            leaves: [
                { name: "கீரை (கோடை)", type: "இலைக் காய்", yield: "நடுத்தரம்", price: "நல்ல", image: "🍃", soil: "களிமண்", duration: "40-50 நாட்கள்", grow_guide: "போல்ட் எதிர்ப்பு வகைகள் தேவை." },
                { name: "அரைக்கீரை", type: "இலைக் காய்", yield: "அதிகம்", price: "உள்ளூர்", image: "🥬", soil: "களிமண்", duration: "30-40 நாட்கள்", grow_guide: "வெப்பத்தை விரும்பும். மிகவும் சத்தானது." }
            ],
            medicinal: [
                { name: "லாவெண்டர்", type: "நறுமணம்", yield: "நடுத்தரம்", price: "எண்ணெய்", image: "🪻", soil: "மணல் / கார", duration: "பல ஆண்டு", grow_guide: "வடிகால் தேவை. அதிக நீர் கொடுக்க வேண்டாம்." }
            ],
            grass: [
                { name: "சூடான் புல்", type: "தீவனம்", yield: "அதிகம்", price: "தீவனம்", image: "🌾", soil: "களிமண்", duration: "60 நாட்கள்", grow_guide: "விதைகளை ஒளி விதைப்பு. வறட்சி சகிப்புத்தன்மை." }
            ]
        },
        WINTER: {
            label: "குளிர்காலம் / குளிர் மிதவெப்பம்",
            description: "குளிர் முதல் உறைபனி வெப்பநிலை. கடினமான தானியங்கள் மற்றும் வேர் காய்கறிகளுக்கு ஏற்றது.",
            profatibility_note: "பூச்சி கட்டுப்பாட்டுக்கான குறைந்த செலவுகள். நிலையான பொருட்பண்ட விலைகள்.",
            advisory: {
                general: "உறைபனி பாதுகாப்புக்கு வரிசை மூடிகள் அல்லது பசுமை இல்லங்களைப் பயன்படுத்தவும்.",
                pest_alert: "குறைந்த பூச்சி செயல்பாடு, ஆனால் அறுவடை செய்த பயிர்களில் சேமிப்பு அழுகல்.",
                water_tip: "நீர்ப்பாசன அதிர்வெண்ணைக் குறைக்கவும்.",
                government_scheme: "குளிர்கால கோதுமை மற்றும் பார்லி கொள்முதல் திட்டங்கள்."
            },
            crops: [
                { name: "கோதுமை", type: "தானியம்", yield: "அதிகம்", price: "உலகம்", image: "🍞", soil: "களிமண்", duration: "110-130 நாட்கள்", grow_guide: "இலையுதிர் / குளிர்காலத்தில் விதைக்கவும்." },
                { name: "கடலை (கொண்டைக்கடலை)", type: "பருப்பு", yield: "நடுத்தரம்", price: "அதிகம்", image: "🧆", soil: "களி களிமண்", duration: "100-110 நாட்கள்", grow_guide: "ஆழமான விதைப்பு தேவை." },
                { name: "பயறு (மசூர்)", type: "பருப்பு", yield: "நடுத்தரம்", price: "நிலையான", image: "🥣", soil: "லேசான களிமண்", duration: "110-130 நாட்கள்", grow_guide: "கடினமான உலர்நில பயிர்." },
                { name: "கடுகு", type: "எண்ணெய் வித்து", yield: "நடுத்தரம்", price: "எண்ணெய்", image: "🌼", soil: "மணல் கலந்த களிமண்", duration: "100-110 நாட்கள்", grow_guide: "ஒளி விதைப்பு. குறைந்த நீர் தேவை." },
                { name: "பார்லி", type: "தானியம்", yield: "அதிகம்", price: "தொழில்துறை", image: "🍺", soil: "களிமண்", duration: "60-70 நாட்கள்", grow_guide: "உப்பு சகிப்புத்தன்மை." }
            ],
            fruits: [
                { name: "ஆரஞ்சு", type: "சிட்ரஸ்", yield: "அதிகம்", price: "பருவகால", image: "🍊", soil: "களிமண்", duration: "பல ஆண்டு", grow_guide: "கடுமையான உறைபனி பாதுகாப்பு தேவை." },
                { name: "ஆப்பிள்", type: "போம்", yield: "பங்கு", price: "நிலையான", image: "🍎", soil: "களிமண்", duration: "பல ஆண்டு", grow_guide: "குளிர்கால குளிர் மணிநேரம் தேவை." },
                { name: "ஸ்ட்ராபெரி", type: "பெரி", yield: "அதிகம்", price: "விலை உயர்ந்த", image: "🍓", soil: "மணல் கலந்த களிமண்", duration: "பருவம்", grow_guide: "ஓட்டங்களை நடவும். வைக்கோலால் மல்ச்." },
                { name: "கிவி", type: "படர்கொடி", yield: "அதிகம்", price: "விலை உயர்ந்த", image: "🥝", soil: "களிமண்", duration: "3-4 ஆண்டுகள்", grow_guide: "வலுவான படலி தேவை." }
            ],
            vegetables: [
                { name: "உருளைக்கிழங்கு", type: "கிழங்கு", yield: "மிக அதிகம்", price: "முக்கிய உணவு", image: "🥔", soil: "தளர்வான களிமண்", duration: "90-120 நாட்கள்", grow_guide: "விதை கிழங்குகளை நடவும்." },
                { name: "காரட்", type: "வேர்", yield: "அதிகம்", price: "நிலையான", image: "🥕", soil: "மணல் (கல் இல்லாத)", duration: "70-80 நாட்கள்", grow_guide: "நேரான வேர்களுக்கு மெல்லிய மண் தேவை." },
                { name: "காலிபிளவர்", type: "பிராசிகா", yield: "நடுத்தரம்", price: "அதிகம்", image: "🥦", soil: "வளமான களிமண்", duration: "90-110 நாட்கள்", grow_guide: "இலைகளால் மூடி வெளுக்கவும்." },
                { name: "பாக் சாய்", type: "பிராசிகா", yield: "அதிகம்", price: "இடைவெளி", image: "🥬", soil: "வளமான களிமண்", duration: "45-50 நாட்கள்", grow_guide: "ஆசிய பசுமை. குளிர் காலநிலை விரும்புகிறது." },
                { name: "டைகான் முள்ளங்கி", type: "வேர்", yield: "அதிகம்", price: "நிலையான", image: "⚪", soil: "ஆழமான மணல் / களிமண்", duration: "60-70 நாட்கள்", grow_guide: "ஆழமான உழவு தேவை. மிகப்பெரியதாக வளரும்." }
            ],
            nuts: [
                { name: "அக்ரூட்", type: "கொட்டை", yield: "ஆண்டுதோறும்", price: "அதிகம்", image: "🧠", soil: "ஆழமான களிமண்", duration: "பல ஆண்டு", grow_guide: "ஆழமான முதல் வேர். இடம் தேவை." }
            ],
            leaves: [
                { name: "கீரை", type: "இலைக் காய்", yield: "அதிகம்", price: "புதிய", image: "🍃", soil: "வளமான களிமண்", duration: "40-50 நாட்கள்", grow_guide: "குளிர் காலநிலையில் செழிக்கும். வெளிப்புற இலைகளை தொடர்ந்து அறுவடை." },
                { name: "கடுகு கீரை", type: "இலைக் காய்", yield: "அதிகம்", price: "உள்ளூர்", image: "🥬", soil: "களிமண்", duration: "30-40 நாட்கள்", grow_guide: "காரமான சுவை. மிக வேகமாக வளரும்." }
            ],
            medicinal: [
                { name: "ஜின்செங்", type: "வேர்", yield: "குறைவு", price: "ஆடம்பரம்", image: "🥕", soil: "காட்டு களிமண்", duration: "5-7 ஆண்டுகள்", grow_guide: "நிழல் தேவை. மிகவும் மெதுவாக வளரும்." },
                { name: "குங்குமப்பூ", type: "களங்கம்", yield: "சிறிய", price: "தங்கம்", image: "🧧", soil: "சுண்ணாம்பு", duration: "பல ஆண்டு", grow_guide: "கிழங்குகளை நடவும். விடியற்காலையில் கைமுறையாக அறுவடை." },
                { name: "அஸ்வகந்தா", type: "வேர்", yield: "நடுத்தரம்", price: "நலன்", image: "⚕️", soil: "மணல் கலந்த களிமண்", duration: "150-180 நாட்கள்", grow_guide: "வறட்சி சகிப்புத்தன்மை." }
            ],
            grass: [
                { name: "ரை புல்", type: "மூடி", yield: "அதிகம்", price: "தீவனம்", image: "🌾", soil: "களிமண்", duration: "ஆண்டு", grow_guide: "வேகமான முளைப்பு. சிறந்த குளிர்கால மூடி பயிர்." }
            ]
        },
        AUTUMN: {
            label: "இலையுதிர்காலம் / அறுவடை",
            description: "குளிர்ச்சியான வெப்பநிலை. பழங்கள், கொட்டைகள் மற்றும் படர்கொடிகளுக்கு முக்கிய அறுவடை பருவம்.",
            profatibility_note: "உச்ச வழங்கல் நேரம்; சிறந்த இலாபங்களுக்கு சேமிப்பு அல்லது செயலாக்கத்தை பரிசீலிக்கவும்.",
            advisory: {
                general: "முதல் உறைபனிக்கு முன் அறுவடைகளை முடிக்கவும்.",
                pest_alert: "பூச்சி குளிர்காலத்தைத் தடுக்க பயிர் எச்சங்களை நிர்வகிக்கவும்.",
                water_tip: "செடிகள் செயலற்ற நிலைக்கு செல்லும்போது நீரைக் குறைக்கவும்.",
                government_scheme: "சேமிப்பு சிலோக்கள் மற்றும் குளிர் சங்கிலிகளுக்கு மானியங்கள்."
            },
            crops: [
                { name: "கினோவா", type: "தானியம்", yield: "நடுத்தரம்", price: "சூப்பர் உணவு", image: "🥣", soil: "மணல் கலந்த களிமண்", duration: "90-120 நாட்கள்", grow_guide: "வறட்சி சகிப்புத்தன்மை. நீர் தேங்குவதைத் தவிர்க்கவும்." },
                { name: "பக்வீட்", type: "மூடி / தானியம்", yield: "நடுத்தரம்", price: "இடைவெளி", image: "🌾", soil: "ஏழை மண் சரி", duration: "70-90 நாட்கள்", grow_guide: "வேகமாக வளரும். நல்ல மகரந்தச் சேர்க்கை ஈர்ப்பான்." },
                { name: "யாம்", type: "கிழங்கு", yield: "அதிகம்", price: "முக்கிய உணவு", image: "🍠", soil: "தளர்வான களிமண்", duration: "8-10 மாதங்கள்", grow_guide: "படர்கொடிகளுக்கு ஆதரவு தேவை." }
            ],
            fruits: [
                { name: "திராட்சை (மது)", type: "படர்கொடி", yield: "மது காய்ச்சல்", price: "மாறுபடும்", image: "🍇", soil: "பாறை / வடிகால்", duration: "பல ஆண்டு", grow_guide: "கத்தரிப்பு முக்கியம். சர்க்கரை அளவுகளை கண்காணிக்கவும்." },
                { name: "மாதுளை", type: "அரிதான", yield: "நடுத்தரம்", price: "அதிகம்", image: "🍎", soil: "களிமண்", duration: "பல ஆண்டு", grow_guide: "வறட்சி கடினமானது. பழ வெடிப்பு முக்கிய பிரச்சனை." },
                { name: "பெர்சிம்மன்", type: "அரிதான", yield: "அதிகம்", price: "உயரும்", image: "🟠", soil: "களிமண்", duration: "பல ஆண்டு", grow_guide: "துவர்ப்பு எதிராக துவர்ப்பு இல்லாத வகைகள்." },
                { name: "க்ரான்பெரி", type: "பெரி", yield: "அதிகம்", price: "விடுமுறை", image: "🔴", soil: "அமில கரி", duration: "பல ஆண்டு", grow_guide: "சதுப்பு நிலங்களில் வளர்க்கப்படுகிறது." }
            ],
            vegetables: [
                { name: "பூசணிக்காய்", type: "பூசணி", yield: "அதிகம்", price: "பருவகால", image: "🎃", soil: "வளமான களிமண்", duration: "100-120 நாட்கள்", grow_guide: "அதிக இடம் தேவை. முழு ஆரஞ்சு நிறத்தில் அறுவடை." },
                { name: "சர்க்கரைவள்ளிக்கிழங்கு", type: "கிழங்கு", yield: "உச்சம்", price: "முக்கிய உணவு", image: "🍠", soil: "மணல்", duration: "100-120 நாட்கள்", grow_guide: "சீட்டுகளை நடவும். வெப்பத்தை விரும்பும்." },
                { name: "பிரஸ்ஸல்ஸ் முளைகள்", type: "பிராசிகா", yield: "நடுத்தரம்", price: "அதிகம்", image: "🟢", soil: "களி களிமண்", duration: "90-100 நாட்கள்", grow_guide: "நீண்ட வளரும் பருவம். உறைபனி சுவையை மேம்படுத்துகிறது." }
            ],
            nuts: [
                { name: "பெக்கன்", type: "கொட்டை", yield: "அதிகம்", price: "நல்ல", image: "🥧", soil: "ஆழமான களிமண்", duration: "பல ஆண்டு", grow_guide: "துத்தநாக இலை தெளிப்புகள் பெரும்பாலும் தேவை." },
                { name: "ஹேசலனட்", type: "கொட்டை", yield: "நடுத்தரம்", price: "உலகம்", image: "🌰", soil: "களிமண்", duration: "பல ஆண்டு", grow_guide: "புதர் அல்லது மர வடிவம்." }
            ],
            leaves: [
                { name: "கேல்", type: "பிராசிகா", yield: "அதிகம்", price: "கடினமான", image: "🥬", soil: "களிமண்", duration: "50-60 நாட்கள்", grow_guide: "உறைபனி சுவையை மேம்படுத்துகிறது (இனிப்பு)." },
                { name: "சார்ட்", type: "இலைக் காய்", yield: "அதிகம்", price: "நிலையான", image: "🥬", soil: "களிமண்", duration: "50-60 நாட்கள்", grow_guide: "வானவில் தண்டுகள். மிகவும் அலங்கார." }
            ],
            medicinal: [
                { name: "வலேரியன்", type: "வேர்", yield: "நடுத்தரம்", price: "தூக்கம்", image: "🌿", soil: "ஈர களிமண்", duration: "பல ஆண்டு", grow_guide: "இரண்டாம் ஆண்டின் இலையுதிர்காலத்தில் வேர்களை அறுவடை." },
                { name: "எக்கினேசியா", type: "வேர் / பூ", yield: "நடுத்தரம்", price: "நோய் எதிர்ப்பு", image: "🌸", soil: "நல்ல வடிகால்", duration: "பல ஆண்டு", grow_guide: "ஊதா கூம்பு மலர். வறட்சி சகிப்புத்தன்மை." }
            ],
            grass: [
                { name: "திமோதி புல்", type: "வைக்கோல்", yield: "நடுத்தரம்", price: "குதிரை உணவு", image: "🌾", soil: "குளிர் / ஈரம்", duration: "பல ஆண்டு", grow_guide: "வைக்கோலுக்கு சிறந்தது. பூக்கும் முன் வெட்டவும்." }
            ]
        }
    },
    hi: {
        RAINY: {
            label: "मानसून / उष्णकटिबंधीय आर्द्र",
            description: "उच्च आर्द्रता और भारी वर्षा। पानी की अधिक खपत वाली और उष्णकटिबंधीय फसलों के लिए आदर्श।",
            profatibility_note: "उच्च उपज क्षमता लेकिन कवक और जल निकासी प्रबंधन की आवश्यकता।",
            advisory: {
                general: "जलभराव रोकने के लिए जल निकासी चैनलों का रखरखाव करें।",
                pest_alert: "धान में ब्लास्ट रोग और मच्छरों से होने वाले रोगों पर नज़र रखें।",
                water_tip: "वर्षा जल संचयन प्रणाली लागू करें।",
                government_scheme: "फसल बीमा और बाढ़ राहत योजनाएं सक्रिय।"
            },
            crops: [
                { name: "चावल (धान)", type: "अनाज", yield: "उच्च", price: "स्थिर", image: "🌾", soil: "चिकनी / दोमट चिकनी", duration: "120-150 दिन", grow_guide: "नर्सरी में बोएं। 2-5 सेमी जल स्तर बनाए रखें।" },
                { name: "गन्ना", type: "नकदी", yield: "अत्यधिक", price: "वैश्विक", image: "🎋", soil: "गहरी दोमट", duration: "10-14 महीने", grow_guide: "नालियों में सेट लगाएं। भारी सिंचाई की आवश्यकता।" },
                { name: "अरहर", type: "दाल", yield: "मध्यम", price: "उच्च", image: "🥣", soil: "बलुई दोमट", duration: "150-180 दिन", grow_guide: "सूखा सहिष्णु। जलभराव से बचें।" }
            ],
            fruits: [
                { name: "केला", type: "उष्णकटिबंधीय", yield: "निरंतर", price: "स्थिर", image: "🍌", soil: "समृद्ध दोमट", duration: "12-14 महीने", grow_guide: "गड्ढों में पौधे लगाएं। अधिक पानी की आवश्यकता।" },
                { name: "पपीता", type: "उष्णकटिबंधीय", yield: "उच्च", price: "लचीला", image: "🍈", soil: "बलुई दोमट", duration: "9-10 महीने", grow_guide: "जलभराव के प्रति संवेदनशील।" }
            ],
            vegetables: [
                { name: "भिंडी", type: "सब्जी", yield: "उच्च", price: "मानक", image: "🥬", soil: "बलुई दोमट", duration: "60-90 दिन", grow_guide: "सीधी बुवाई। गर्मी में फलती-फूलती है।" },
                { name: "बैंगन", type: "सब्जी", yield: "उच्च", price: "मानक", image: "🍆", soil: "गाद दोमट", duration: "100-120 दिन", grow_guide: "मिट्टी नम रखें।" }
            ],
            nuts: [
                { name: "मूंगफली", type: "तिलहन", yield: "उच्च", price: "स्थिर", image: "🥜", soil: "बलुई / ढीली", duration: "100-120 दिन", grow_guide: "बुवाई के बाद मिट्टी चढ़ाएं।" }
            ],
            leaves: [
                { name: "करी पत्ता", type: "जड़ी-बूटी", yield: "निरंतर", price: "स्थिर", image: "🌿", soil: "लाल / दोमट", duration: "बारहमासी", grow_guide: "नियमित कटाई करें।" }
            ],
            medicinal: [
                { name: "एलोवेरा", type: "औषधीय", yield: "उच्च", price: "अच्छा", image: "🌵", soil: "बलुई", duration: "18-24 महीने", grow_guide: "न्यूनतम पानी की आवश्यकता।" },
                { name: "हल्दी", type: "औषधीय", yield: "मध्यम", price: "उच्च", image: "🧡", soil: "दोमट", duration: "8-9 महीने", grow_guide: "जब पत्तियां पीली हो जाएं तब काटें।" }
            ],
            grass: [
                { name: "नेपियर घास", type: "चारा", yield: "अत्यधिक", price: "कम", image: "🌾", soil: "उपजाऊ दोमट", duration: "50 दिन", grow_guide: "तेजी से बढ़ने वाला चारा।" }
            ]
        },
        SUMMER: {
            label: "गर्मी / समशीतोष्ण गर्म",
            description: "तेज धूप के साथ गर्म दिन। फलों और सब्जियों के लिए आदर्श।",
            profatibility_note: "निरंतर सिंचाई की आवश्यकता। ताजी उपज की उच्च मांग।",
            advisory: {
                general: "नमी बनाए रखने के लिए मल्चिंग करें।",
                pest_alert: "कीटों और मकड़ी के जालों पर नज़र रखें।",
                water_tip: "ड्रिप सिंचाई का उपयोग करें।",
                government_scheme: "सौर पंपों के लिए सब्सिडी उपलब्ध।"
            },
            crops: [
                { name: "मक्का", type: "अनाज", yield: "उच्च", price: "स्थिर", image: "🌽", soil: "दोमट", duration: "90-110 दिन", grow_guide: "सीधी बुवाई करें।" },
                { name: "सोयाबीन", type: "तिलहन", yield: "उच्च", price: "वैश्विक", image: "🌱", soil: "दोमट", duration: "90-100 दिन", grow_guide: "अच्छी फसल चक्र फसल।" }
            ],
            fruits: [
                { name: "तरबूज", type: "फल", yield: "उच्च", price: "मौसमी", image: "🍉", soil: "बलुई दोमट", duration: "80-100 दिन", grow_guide: "बेल फैलने के लिए जगह चाहिए।" },
                { name: "आम", type: "फलों का राजा", yield: "उच्च", price: "प्रीमियम", image: "🥭", soil: "जलोढ़ / लैटेराइट", duration: "बारहमासी", grow_guide: "गहरी सिंचाई आवश्यक।" }
            ],
            vegetables: [
                { name: "टमाटर", type: "सब्जी", yield: "उच्च", price: "बदलती", image: "🍅", soil: "दोमट", duration: "70-90 दिन", grow_guide: "सहारे की आवश्यकता।" },
                { name: "खीरा", type: "सब्जी", yield: "उच्च", price: "स्थिर", image: "🥒", soil: "दोमट", duration: "50-70 दिन", grow_guide: "नियमित तुड़ाई करें।" }
            ],
            nuts: [
                { name: "काजू", type: "मेवा", yield: "मध्यम", price: "निर्यात", image: "🥜", soil: "बलुई / लैटेराइट", duration: "3 साल", grow_guide: "सख्त पेड़।" }
            ],
            leaves: [
                { name: "चौलाई", type: "पत्तेदार", yield: "उच्च", price: "स्थानीय", image: "🥬", soil: "दोमट", duration: "30-40 दिन", grow_guide: "बेहद पौष्टिक।" }
            ],
            medicinal: [
                { name: "लैवेंडर", type: "सुगंधित", yield: "मध्यम", price: "तेल", image: "🪻", soil: "बलुई / क्षारीय", duration: "बारहमासी", grow_guide: "जल निकासी आवश्यक।" }
            ],
            grass: [
                { name: "सुदान घास", type: "चारा", yield: "उच्च", price: "चारा", image: "🌾", soil: "दोमट", duration: "60 दिन", grow_guide: "सूखा सहिष्णु।" }
            ]
        },
        WINTER: {
            label: "सर्दी / ठंडा समशीतोष्ण",
            description: "ठंडा तापमान। अनाज और जड़ वाली सब्जियों के लिए आदर्श।",
            profatibility_note: "कम लागत। स्थिर मूल्य।",
            advisory: {
                general: "पाले से बचाव के लिए कवर का उपयोग करें।",
                pest_alert: "भंडारण में सड़न पर नज़र रखें।",
                water_tip: "सिंचाई की आवृत्ति कम करें।",
                government_scheme: "गेहूं खरीद कार्यक्रम सक्रिय।"
            },
            crops: [
                { name: "गेहूं", type: "अनाज", yield: "उच्च", price: "वैश्विक", image: "🍞", soil: "दोमट / चिकनी", duration: "110-130 दिन", grow_guide: "सर्दियों में बोएं।" },
                { name: "चना", type: "दाल", yield: "मध्यम", price: "उच्च", image: "🧆", soil: "चिकनी दोमट", duration: "100-110 दिन", grow_guide: "गहरी बुवाई करें।" }
            ],
            fruits: [
                { name: "संतरा", type: "खट्टा फल", yield: "उच्च", price: "मौसमी", image: "🍊", soil: "दोमट", duration: "बारहमासी", grow_guide: "अधिक पोषण की आवश्यकता।" },
                { name: "सेब", type: "फल", yield: "स्थिर", price: "स्थिर", image: "🍎", soil: "दोमट", duration: "बारहमासी", grow_guide: "सर्दी आवश्यक।" }
            ],
            vegetables: [
                { name: "आलू", type: "कंद", yield: "अत्यधिक", price: "प्रमुख", image: "🥔", soil: "ढीली दोमट", duration: "90-120 दिन", grow_guide: "मिट्टी चढ़ाते रहें।" },
                { name: "गाजर", type: "जड़", yield: "उच्च", price: "स्थिर", image: "🥕", soil: "बलुई", duration: "70-80 दिन", grow_guide: "सीधी जड़ों के लिए नरम मिट्टी।" }
            ],
            nuts: [
                { name: "अखरोट", type: "मेवा", yield: "वार्षिक", price: "उच्च", image: "🧠", soil: "गहरी दोमट", duration: "बारहमासी", grow_guide: "जगह चाहिए।" }
            ],
            leaves: [
                { name: "पालक", type: "पत्तेदार", yield: "उच्च", price: "ताजा", image: "🍃", soil: "समृद्ध दोमट", duration: "40-50 दिन", grow_guide: "ठंड में फलता है।" }
            ],
            medicinal: [
                { name: "अश्वगंधा", type: "जड़", yield: "मध्यम", price: "स्वास्थ्य", image: "⚕️", soil: "बलुई दोमट", duration: "150-180 दिन", grow_guide: "सूखा सहिष्णु।" }
            ],
            grass: [
                { name: "राये घास", type: "कवर", yield: "उच्च", price: "चारा", image: "🌾", soil: "चिकनी दोमट", duration: "वार्षिक", grow_guide: "तेजी से उगती है।" }
            ]
        },
        AUTUMN: {
            label: "शरद / फसल कटाई",
            description: "ठंडा होता तापमान। फलों और मेवों के लिए प्रमुख मौसम।",
            profatibility_note: "चरम आपूर्ति का समय; भंडारण का विचार करें।",
            advisory: {
                general: "पाले से पहले कटाई पूरी करें।",
                pest_alert: "फसलों के अवशेषों का प्रबंधन करें।",
                water_tip: "पानी कम करें।",
                government_scheme: "साइलो और कोल्ड चेन के लिए सब्सिडी।"
            },
            crops: [
                { name: "क्विनोआ", type: "अनाज", yield: "मध्यम", price: "सुपरफूड", image: "🥣", soil: "बलुई दोमट", duration: "90-120 दिन", grow_guide: "सूखा सहिष्णु।" },
                { name: "यैम", type: "कंद", yield: "उच्च", price: "प्रमुख", image: "🍠", soil: "ढीली दोमट", duration: "8-10 महीने", grow_guide: "सहारे की आवश्यकता।" }
            ],
            fruits: [
                { name: "अनार", type: "फल", yield: "मध्यम", price: "उच्च", image: "🍎", soil: "दोमट", duration: "बारहमासी", grow_guide: "फटने से बचाएं।" },
                { name: "अंगूर", type: "बेल", yield: "उच्च", price: "बदलती", image: "🍇", soil: "पथरीली / निकासी", duration: "बारहमासी", grow_guide: "कटाई-छंटाई आवश्यक।" }
            ],
            vegetables: [
                { name: "कद्दू", type: "सब्जी", yield: "उच्च", price: "मौसमी", image: "🎃", soil: "समृद्ध दोमट", duration: "100-120 दिन", grow_guide: "अधिक जगह चाहिए।" },
                { name: "शकरकंद", type: "कंद", yield: "चरम", price: "प्रमुख", image: "🍠", soil: "बलुई", duration: "100-120 दिन", grow_guide: "गर्मी पसंद।" }
            ],
            nuts: [
                { name: "अखरोट (पेकन)", type: "मेवा", yield: "उच्च", price: "अच्छा", image: "🥧", soil: "गहरी दोमट", duration: "बारहमासी", grow_guide: "बड़े पेड़।" }
            ],
            leaves: [
                { name: "केल", type: "पत्तेदार", yield: "उच्च", price: "सख्त", image: "🥬", soil: "दोमट", duration: "50-60 दिन", grow_guide: "ठंड से स्वाद सुधरता है।" }
            ],
            medicinal: [
                { name: "इचिनेशिया", type: "जड़", yield: "मध्यम", price: "प्रतिरक्षा", image: "🌸", soil: "निकासी", duration: "बारहमासी", grow_guide: "सूखा सहिष्णु।" }
            ],
            grass: [
                { name: "तिमोथी घास", type: "चारा", yield: "मध्यम", price: "चारा", image: "🌾", soil: "ठंडा / आर्द्र", duration: "बारहमासी", grow_guide: "सूखे चारे के लिए श्रेष्ठ।" }
            ]
        }
    },
    ja: {
        RAINY: {
            label: "雨季 / 熱帯湿潤",
            description: "湿度が高く、降水量が多い時期です。水田稲作や熱帯作物に最適です。",
            profatibility_note: "高い収量が見込めますが、徹底した排水管理とカビ対策が必要です。",
            advisory: {
                general: "浸水を防ぐために排水路を整備してください。カビの発生を監視してください。",
                pest_alert: "根腐れ、いもち病、害虫の発生に注意してください。",
                water_tip: "雨水貯留システムを活用しましょう。あぜ道の安全を確認してください。",
                government_scheme: "グローバル：農業保険および洪水救済制度が適用されます。"
            },
            crops: [
                { name: "米（水稲）", type: "穀物", yield: "25-30 クインタール", price: "￥25,000 - ￥40,000", image: "🌾", soil: "粘土質 / 粘土質ローム", duration: "120-150 日", grow_guide: "苗代で育苗し、本田へ移植します。2-5cmの水位を維持してください。" },
                { name: "サトウキビ", type: "工芸作物", yield: "35-40 トン", price: "￥30,000 - ￥45,000", image: "🎋", soil: "深いローム", duration: "10-14 ヶ月", grow_guide: "溝に苗を植えます。頻繁な灌漑と十分な施肥が必要です。" }
            ],
            fruits: [
                { name: "バナナ", type: "熱帯果樹", yield: "20-25 トン", price: "￥150 - ￥250/kg", image: "🍌", soil: "肥沃なローム", duration: "12-14 ヶ月", grow_guide: "穴に吸芽を植えます。十分な水と防風対策が必要です。" }
            ],
            vegetables: [
                { name: "オクラ", type: "野菜", yield: "多収", price: "標準", image: "🥬", soil: "砂質ローム", duration: "60-90 日", grow_guide: "直まきします。高温多湿でよく育ちます。" }
            ]
        },
        SUMMER: {
            label: "夏季 / 温帯温暖",
            description: "日差しが強く、日が長い時期です。果菜類や野菜の栽培に適しています。",
            profatibility_note: "継続的な灌漑が必要です。生鮮農産物の市場需要が高い時期です。",
            advisory: {
                general: "土壌の水分を保つためにマルチングを徹底してください。早朝に灌漑を行ってください。",
                pest_alert: "アブラムシ、アザミウマ、ハダニの発生に注意してください。",
                water_tip: "ドリップ灌漑を使用して水利用効率を最大化しましょう。",
                government_scheme: "ソーラーポンプおよびマイクロ灌漑の補助金が利用可能です。"
            },
            crops: [
                { name: "トウモロコシ", type: "穀物", yield: "20-25 クインタール", price: "￥20,000 - ￥35,000", image: "🌽", soil: "ローム", duration: "90-110 日", grow_guide: "受粉のために密集させて直まきします。" }
            ],
            fruits: [
                { name: "スイカ", type: "メロン類", yield: "15-20 トン", price: "￥10,000 - ￥15,000", image: "🍉", soil: "砂質ローム", duration: "80-100 日", grow_guide: "つるが広がるスペースを確保してください。" }
            ]
        },
        WINTER: {
            label: "冬季 / 冷涼温帯",
            description: "気温が低い時期です。耐寒性のある穀物や根菜類に適しています。",
            profatibility_note: "病害虫の発生が少なく、管理コストを抑えられます。",
            advisory: {
                general: "霜対策のために不織布やビニールハウスを活用してください。",
                pest_alert: "病害虫は少ないですが、貯蔵中の腐敗に注意してください。",
                water_tip: "灌漑の頻度を減らしてください。",
                government_scheme: "冬小麦および大麦の買い取りプログラムが実施されます。"
            },
            crops: [
                { name: "小麦", type: "穀物", yield: "18-22 クインタール", price: "￥22,000 - ￥38,000", image: "🍞", soil: "ローム / 粘土質", duration: "110-130 日", grow_guide: "秋から冬にかけて播種します。" }
            ],
            vegetables: [
                { name: "ジャガイモ", type: "塊茎", yield: "極めて多収", price: "安定", image: "🥔", soil: "砂質ローム", duration: "90-120 日", grow_guide: "種芋を植えます。土寄せをしっかり行ってください。" }
            ]
        },
        AUTUMN: {
            label: "秋季 / 収穫期",
            description: "気温が下がり始める時期です。果物やナッツの主要な収穫シーズンです。",
            profatibility_note: "供給が集中するため、貯蔵や加工を検討して利益を確保しましょう。",
            advisory: {
                general: "初霜が降りる前に収穫を終えてください。",
                pest_alert: "翌年の発生を抑えるため、残渣の処理を適切に行ってください。",
                water_tip: "休眠期に向けて徐々に水やりを減らしてください。",
                government_scheme: "サイロやコールドチェーン構築への補助金があります。"
            },
            crops: [
                { name: "キヌア", type: "雑穀", yield: "5-7 クインタール", price: "￥15,000 - ￥25,000", image: "🥣", soil: "砂質ローム", duration: "90-120 日", grow_guide: "乾燥に強いですが、湿害に注意してください。" }
            ]
        }
    }
};
