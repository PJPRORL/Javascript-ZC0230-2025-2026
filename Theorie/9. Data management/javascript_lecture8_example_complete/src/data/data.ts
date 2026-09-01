import type {Author} from '../models/author.ts'
import type {Book} from '../models/book.ts'
import type {Series} from '../models/series.ts'

// Aangezien deze data gedeeld wordt doorheen verschillende pagina's moet deze data gedeeld worden door een centrale
// plaats.
// Door de data hier te definiëren kan deze op alle andere pagina's geïmporteerd worden.
// De dataManager variabele wordt een globale variabele die overal beschikbaar is.
interface DataManager {
    books: Book[]
    authors: Author[]
    series: Series[]
}

export const dataManager: DataManager = {
    books: [
        {
            id: '2f14bf86-2837-4b92-b329-a78ea71ca4ad',
            series: {name: 'Hyperion Cantos', id: '0f31cbcc-bd4b-4ece-b169-2c931ed8e41b', number: 1},
            publicationYear: 1989,
            author: {
                id: '4a1d3bd4-e35f-4301-af14-80a3aa0b0079',
                name: 'Dan Simmons',
                description:
                    "Dan Simmons (born April 4, 1948) is an American science fiction and horror writer. He is the author of the Hyperion Cantos and the Ilium/Olympos cycles, among other works that span the science fiction, horror, and fantasy genres, sometimes within a single novel. Simmons's genre-intermingling Song of Kali (1985) won the World Fantasy Award.",
                profile:
                    'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSZ53vcGWYo-6Cpi5WFbS1ndlCtXGu8E-yj2VThSl6NTr7_dcqsJWqJv8wn2ORqUL-S4xjPhySmBuba5yWrkc4hxg',
            },
            type: 'print',
            title: 'Hyperion',
        },
    ],
    authors: [
        {
            id: '6f7753e0-134b-434f-90f4-214389dd5041',
            name: 'Steven Erikson',
            description:
                'Steve Rune Lundin (born October 7, 1959), known by his pseudonym Steven Erikson, is a Canadian novelist who was educated and trained as both an archaeologist and anthropologist.',
            profile: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Steven_Erikson_2016.jpg',
        },
        {
            id: '4a1d3bd4-e35f-4301-af14-80a3aa0b0079',
            name: 'Dan Simmons',
            description:
                "Dan Simmons (born April 4, 1948) is an American science fiction and horror writer. He is the author of the Hyperion Cantos and the Ilium/Olympos cycles, among other works that span the science fiction, horror, and fantasy genres, sometimes within a single novel. Simmons's genre-intermingling Song of Kali (1985) won the World Fantasy Award.",
            profile:
                'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSZ53vcGWYo-6Cpi5WFbS1ndlCtXGu8E-yj2VThSl6NTr7_dcqsJWqJv8wn2ORqUL-S4xjPhySmBuba5yWrkc4hxg',
        },
        {
            id: 'b4cc061f-0743-449e-b0be-cce7055f1154',
            name: 'Robin Hobb',
            description:
                'Margaret Astrid Lindholm Ogden (born March 5, 1952; née Lindholm), known by her pen names Robin Hobb and Megan Lindholm, is an American writer of speculative fiction. As Hobb, she is best known for her fantasy novels set in the Realm of the Elderlings.',
            profile:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Robin_Hobb_by_Gage_Skidmore.jpg/1920px-Robin_Hobb_by_Gage_Skidmore.jpg',
        },
    ],
    series: [
        {name: 'The Malazan Book of the Fallen', id: 'b16cca4a-e13e-4854-bb34-7fac4fd31f02'},
        {name: 'Hyperion Cantos', id: '0f31cbcc-bd4b-4ece-b169-2c931ed8e41b'},
        {name: 'The Farseer Trilogy', id: '5269d1b5-19c0-432f-a797-c88fead0475f'},
    ],
}
