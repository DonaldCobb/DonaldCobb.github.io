# «Сокол» · рамка машин, видео-интерфейс и 3D · референсы, круг 3

Обновлено: 2026-10-21 · галерея: https://donaldcobb.github.io/sokol-1f98f0fd/refs3/pick.html

Внутренние референсы для выбора, не для продукта: права у авторов, картинки в продукт не берём — берём приёмы.

Оценки 1–5: качество · близость к задаче · вкус Юлая. Номер = rNN.webp в img/ и номер на странице. «▶ анимация» — приём живёт в движении, смотреть по ссылке на видео или страницу.

Запрос: msg 7446 — «красиво доработать, как рамка машин показывается, и все элементы интерфейса на видео… современно, с анимациями, как в фильмах про технологии»; msg 7442 — «чтобы строилась 3D-модель, видно, как техника двигается в 3D, и показывается контур».

## A. Рамки и подписи на видео — настоящие продукты и концепты

| № | Что | Компания/Автор | Источник | Что взять | Оценки |
|---|---|---|---|---|---|
| r01 | NVIDIA Metropolis · уголки и номер у каждой машины ▶ анимация | NVIDIA (партнёр Nota) | [YouTube, NVIDIA Developer, «Let's Build Smarter, Safer Spaces…»](https://www.youtube.com/watch?v=qJg-HoF5RHs) | уголки вместо сплошной рамки; плашка «Car 4728» над машиной; цвет по классу (скорая — зелёная, грузовик — жёлтый, крупно) | 5 · 5 · 4 |
| r02 | NVIDIA · вид сверху: скорость, счётчики на линиях, тепловой след ▶ анимация | NVIDIA | [YouTube, NVIDIA, «Build and Test Smart City AI Agents in Digital Twins»](https://www.youtube.com/watch?v=9k3Y6KRGPxo) | цифры счёта прямо на линиях въезда; скорость плашкой у машины; цветной след по скорости — прямой аналог въезд/выезд на площадке | 5 · 5 · 4 |
| r03 | NVIDIA + Verizon · объёмные рамки и пятно на земле ▶ анимация | NVIDIA, Verizon | [YouTube, NVIDIA Developer, «Building the AI City with NVIDIA Metropolis»](https://www.youtube.com/watch?v=gD2y7s-FsX0) | прозрачный параллелепипед вместо плоской рамки и цветной след-«тень» на земле; светящаяся сетка дороги | 4 · 4 · 4 |
| r04 | Roboflow Supervision · тонкие уголки на ч/б видео | Roboflow | [документация Supervision, раздел Annotators](https://supervision.roboflow.com/latest/detection/annotators/) | видео приглушить в ч/б — цветные тонкие уголки читаются сразу; один акцент-цвет на всё | 4 · 5 · 4 |
| r05 | Roboflow Supervision · свечение по силуэту вместо рамки | Roboflow | [документация Supervision, раздел Annotators](https://supervision.roboflow.com/latest/detection/annotators/) | ореол по контуру объекта (маска + размытие) — «как в кино», без коробок; для машины — по силуэту техники | 4 · 4 · 5 |
| r06 | Roboflow Supervision · след пути за каждым объектом | Roboflow | [документация Supervision, раздел Annotators](https://supervision.roboflow.com/latest/detection/annotators/) | хвост траектории за машиной (последние 2–3 с) — видно, откуда приехала и куда едет; затухание к хвосту | 4 · 5 · 4 |
| r07 | Mobileye · кольцо на земле под машиной ▶ анимация | Mobileye | [YouTube, Mobileye, «Autonomous driving in Munich…»](https://www.youtube.com/watch?v=IQrYiqEsr7A) | эллипс-ореол на земле под выбранной машиной вместо рамки — отметка «эта» без перекрытия картинки | 4 · 4 · 5 |
| r08 | Voxel51 · объёмные рамки по классам на фото | Voxel51 | [сайт Voxel51, главная](https://voxel51.com/) | каркасные кубоиды с цветом по классу и вложенные малые рамки; тонкая линия 1 px | 4 · 4 · 3 |
| r09 | Verkada · линия пересечения и карточка события | Verkada | [сайт Verkada, раздел камер](https://www.verkada.com/security-cameras/) | линия с двумя ручками поверх кадра + карточка «Line Crossing · камера · время» в ленте — готовый образец «въехал/выехал» | 5 · 5 · 4 |
| r10 | Spot AI · залитая зона на стройке ▶ анимация | Spot AI | [сайт Spot AI, главная (видео-обложка)](https://www.spot.ai/) | полупрозрачная заливка зоны вместо рамки — для «опасной зоны» и площадки разгрузки | 4 · 3 · 4 |
| r11 | Built Robotics · красная рамка-заливка и процент уверенности | Built Robotics | [сайт Built Robotics, главная](https://www.builtrobotics.com/) | рамка с лёгкой заливкой и плашкой «99.3%» в углу; затемнение к низу кадра под подписи | 4 · 4 · 4 |
| r12 | MANTIS · сетка камер, событие красным заголовком · концепт | автор на Dribbble | [Dribbble, «AI Meets Real-World Safety»](https://dribbble.com/shots/26199548-AI-Meets-Real-World-Safety) | камера с событием — красная шапка, остальные зелёные; зона на полу тонированным сектором; подписи «Person ID» стеклом | 4 · 4 · 4 |
| r13 | Tensra · прозрачные рамки и счёт по классам · концепт | автор на Dribbble | [Dribbble, «AI Image Annotation Tool — Labelling Interface UI»](https://dribbble.com/shots/27280013-AI-Image-Annotation-Tool-Labelling-Interface-UI) | рамка — полупрозрачная заливка цвета класса с маленьким ярлыком; слева список классов с числом и цветной точкой | 4 · 3 · 4 |

## B. Кино и моушн-дизайн: интерфейсы поверх кадра

| № | Что | Компания/Автор | Источник | Что взять | Оценки |
|---|---|---|---|---|---|
| r14 | «Форсаж 7» · вид сверху на машину, данные по краям | Cantina Creative | [сайт студии, Furious 7](https://www.cantinacreative.com/film/furious-7) | тонкие уголки по углам кадра, [REC], блок данных слева мелким капсом, цель в центре без рамки — рамка у кадра, а не у машины | 5 · 5 · 5 |
| r15 | «Форсаж 7» · распознавание номера | Cantina Creative | [сайт студии, Furious 7](https://www.cantinacreative.com/film/furious-7) | номер подсвечен прямоугольником с бликом; шапка «VEHICLE RECOGNITION · город» оранжевым; бегущий код поверх как фон-шум | 4 · 5 · 4 |
| r16 | «Форсаж 7» · город сверху, маршрут и метки камер | Cantina Creative | [сайт студии, Furious 7](https://www.cantinacreative.com/film/furious-7) | красная ломаная маршрута поверх снимка, иконки камер и прицелы; шапка цели справа — для схемы площадки сверху | 5 · 4 · 4 |
| r17 | «Джек Райан» · дрон ведёт машину по дороге ▶ анимация | Territory Studio | [сайт студии, Tom Clancy's Jack Ryan](https://territorystudio.com/project/tom-clancys-jack-ryan/) | тонкая зелёная рамка-визир с надписью статуса над целью, телеметрия по углам мелко — минимум поверх живого кадра | 5 · 5 · 5 |
| r18 | «Трон: Арес» · счётчики-бирки на машинах ночью ▶ анимация | GMUNK | [сайт GMUNK, TRON Ares Computer Vision](https://www.gmunk.com/TRON-Ares-Computer-Vision) | бирка с крупными цифрами, «прилипшая» к машине и едущая с ней; монохромный тон кадра под цвет интерфейса (на странице есть анимации) | 5 · 4 · 4 |
| r19 | «Трон: Арес» · город сверху, связи и окна видео ▶ анимация | GMUNK | [сайт GMUNK, TRON Ares Computer Vision](https://www.gmunk.com/TRON-Ares-Computer-Vision) | карта сверху + врезанные окна живого видео на своих местах + линии связей — схема и камеры в одном виде (анимировано) | 5 · 4 · 4 |
| r20 | «Обливион» · карта с заштрихованной зоной | GMUNK | [сайт GMUNK, Oblivion GFX](https://www.gmunk.com/Oblivion-GFX) | штриховка красным — запретная зона; сетка с номерами клеток; боковые колонки статусов с иконками | 5 · 4 · 5 |
| r21 | «Обливион» · перспективный визир на цели | GMUNK | [сайт GMUNK, Oblivion GFX](https://www.gmunk.com/Oblivion-GFX) | трапеция-рамка по перспективе земли и шкала делений сверху — рамка «лежит» в сцене, а не плоско | 4 · 3 · 4 |
| r22 | «Обливион» · кольца прицела и плашка CLEAR | GMUNK | [сайт GMUNK, Oblivion GFX](https://www.gmunk.com/Oblivion-GFX) | статус-пилюля прямо на цели («CLEAR» → у нас «ВЪЕХАЛ»), концентрические кольца, монохром | 4 · 3 · 4 |
| r23 | «Хантер Киллер» · светлая карта, кольца целей | Territory Studio | [сайт студии, Hunter Killer](https://territorystudio.com/project/hunter-killer/) | светлая тема: цели — кольца с разрывами (красная/зелёная), пунктир и расстояние между — для светлой схемы площадки | 5 · 4 · 5 |
| r24 | «Наёмник» · судно сверху, тепловые пятна | Territory Studio | [сайт студии, American Assassin](https://territorystudio.com/project/american-assassin/) | объект приглушён, горячие части подсвечены цветом; крупная шапка «LIVE FEED» тонким шрифтом | 4 · 4 · 4 |
| r25 | «Миля 22» · снимок дрона в рамке-пульте | Territory Studio | [сайт студии, Mile 22](https://territorystudio.com/project/mile-22/) | центральный снимок в зелёных уголках, вокруг колонки данных мелким моно-шрифтом — плотность «пульта» | 4 · 4 · 3 |

## C. 3D-площадка и цифровой двойник: техника движется, контур виден

| № | Что | Компания/Автор | Источник | Что взять | Оценки |
|---|---|---|---|---|---|
| r26 | Waymo · вид сверху: кубоиды, коридор пути, врезка камеры ▶ анимация | Waymo | [YouTube, Waymo, «…navigates a police controlled intersection»](https://www.youtube.com/watch?v=OopTOjnD3qY) | объёмные коробки со стрелкой направления, зелёный коридор пути, линия стопа штриховкой, врезка живой камеры в углу | 5 · 5 · 4 |
| r27 | Streetscape.gl · облако точек, 3D-рамки, шкала времени · концепт ▶ анимация | автор на Dribbble (открытый проект Uber) | [Dribbble, «Open Sourcing Autonomous Visualization System»](https://dribbble.com/shots/6484492-Open-Sourcing-Autonomous-Visualization-System) | прозрачные синие коробки с иконкой-булавкой сверху, линии путей, шкала времени снизу для перемотки (анимировано) | 5 · 5 · 4 |
| r28 | Applied Intuition · тёмная 3D-сцена, коробки с иконками | Applied Intuition | [сайт Applied Intuition, главная](https://www.appliedintuition.com/) | коробки тёплым цветом, над каждой круглая иконка типа; у выбранной машины — светящаяся лента пути | 5 · 5 · 4 |
| r29 | Waymo · ночной город из точек, светящиеся пути | Waymo | [сайт Waymo, Waymo Driver](https://waymo.com/waymo-driver/) | изометрия, здания из точек, пути линиями свечения, плашки над объектами — красивый «цифровой двойник» без тяжёлой 3D-графики | 5 · 4 · 5 |
| r30 | Waymo · светлая глиняная изометрия, один путь | Waymo | [сайт Waymo](https://waymo.com/) | белые блоки-здания, одна машина, путь двумя цветами (пройдено/впереди), зона зелёным квадратом — светлая тема схемы | 5 · 4 · 5 |
| r31 | Отчёт о ДТП · тёмный 3D-город, участники цветом · концепт ▶ анимация | автор на Dribbble | [Dribbble, «Dashboard Interface Design — Traffic Accident Reporting»](https://dribbble.com/shots/18506746-Dashboard-Interface-Design-Traffic-Accident-Reporting) | всё серое, нужные машины — красным и жёлтым; список событий слева с фото камеры; переключатель 2D/3D (анимировано) | 4 · 5 · 4 |
| r32 | Voltera · 3D-парковка с зонами и карточкой места · концепт | автор на Dribbble | [Dribbble, «Voltera | Smart EV Fleet & Facility Parking…»](https://dribbble.com/shots/27736791-Voltera-Smart-EV-Fleet-Facility-Parking-Touch-Dashboard-UI) | фотореалистичная 3D-площадка, места обведены цветом занятости, всплывающая карточка у места, графики загрузки снизу | 4 · 4 · 5 |
| r33 | Fuselab · 3D-кампус, камеры и лента событий · концепт ▶ анимация | Fuselab Creative | [Dribbble, «AI Generated Camera View Dashboard»](https://dribbble.com/shots/25822749-AI-Generated-Camera-View-Dashboard) | 3D-модель объекта + список камер + видео + шкала времени с цветными событиями — ровно наш пульт в одном экране (анимировано) | 4 · 5 · 4 |
| r34 | Smart Traffic Flow · тёмный перекрёсток, светящиеся полосы · концепт ▶ анимация | автор на Dribbble | [Dribbble, «Smart Traffic Flow — Motion UI Concept»](https://dribbble.com/shots/26726242-Smart-Traffic-Flow-Motion-UI-Concept) | тёмная низкополигональная сцена, полосы подсвечены салатовым, машины едут (анимировано) — простая 3D-схема въезда | 4 · 4 · 4 |
| r35 | Rerun · 3D-облако, конусы камер, 4 видео и шкала ▶ анимация | Rerun | [сайт Rerun (обложка ролика из их соцсети)](https://rerun.io/) | облако точек с конусами обзора камер, справа ряд живых видео, снизу общая шкала времени — синхронный просмотр | 4 · 4 · 3 |
| r36 | Сканирование · серый город, кольцо у машины · концепт ▶ анимация | автор на Dribbble | [Dribbble, «Autonomous vehicle — scanning sensors using AI»](https://dribbble.com/shots/24004297-Autonomous-vehicle-scanning-sensors-using-AI) | мир в сером «глине», только объекты — бирюзой: кольцо под машиной, люди зелёным силуэтом (анимировано) | 4 · 4 · 4 |
| r37 | Цифровой двойник цеха · белая 3D-модель с карточками · концепт | автор на Dribbble | [Dribbble, «B2B Manufacturing Digital Twin & Machine Monitoring»](https://dribbble.com/shots/27622456-B2B-Manufacturing-Digital-Twin-Machine-Monitoring-UX-UI-Design) | белая модель + стеклянные карточки у машин со статусом и временем — светлая тема 3D для клиента-производства | 4 · 3 · 5 |
| r38 | Komatsu Smart Construction · съёмка площадки и выемка цветом ▶ анимация | Komatsu | [YouTube, Komatsu North America, «Komatsu Smart Construction Edge»](https://www.youtube.com/watch?v=HEjKvK88wPU) | модель площадки с дрона, объём выемки тепловой картой, техника на ней — настоящий стройплощадочный продукт на планшете | 4 · 4 · 3 |

## Не нашли пригодного или не открылось

- Behance и ArtStation — отдают 403 нашему серверу, работы оттуда не брали.
- Perception (студия интерфейсов для Marvel) — не нашли их сайт с кадрами, под тем же именем другая компания.
- Tesla FSD — кадры только салона с маленьким экраном, слабо. Anduril, Palantir, Scale, Foxglove, Cesium, Propeller — сайты на скриптах, картинки не вытащились или это фото без интерфейса.
- Bentley SYNCHRO (4D-стройка) — нашли только картинку 590 px, мелко; не взяли.
- Кадры YouTube — обложки и автокадры (25/50/75 % ролика) из i.ytimg.com: загрузчика видео на сервере нет, точный кадр с приёмом можно взять с ПК.
- Dribbble: авторы не подписаны — страница не отдала имя без браузера-человека; автор виден по ссылке.
