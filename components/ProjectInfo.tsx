import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  AlertTriangle, 
  Database, 
  Layers, 
  GitBranch, 
  CheckCircle2, 
  Cpu
} from 'lucide-react';

const datasetData = [
  { name: '训练集', value: 300 },
  { name: '测试集', value: 237 },
];

const imbalanceData = [
  { name: '背景像素', value: 96 },
  { name: '裂纹像素', value: 4 },
];

const COLORS = ['#3b82f6', '#10b981'];
const IMBALANCE_COLORS = ['#cbd5e1', '#ef4444'];

export const ProjectInfo: React.FC = () => {
  return (
    <div className="space-y-12 pb-12 animate-fade-in">
      {/* Background Section */}
      <section className="space-y-6">
        <div className="flex items-center space-x-3 mb-4 border-b border-gray-200 pb-2">
          <AlertTriangle className="w-6 h-6 text-orange-500" />
          <h2 className="text-2xl font-bold text-slate-800">1. 项目背景与痛点</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="font-semibold text-lg mb-3 text-slate-700">道路维护挑战</h3>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start">
                <span className="mr-2 text-red-500">•</span>
                随着城市化加快，道路负荷增大，裂缝成为主要安全隐患。
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-red-500">•</span>
                人工巡检效率低、危险系数高、主观性强。
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-red-500">•</span>
                传统方式难以进行数字化管理和量化分析。
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl shadow-lg text-white flex flex-col justify-center">
            <h3 className="font-semibold text-lg mb-3 flex items-center">
              <Cpu className="w-5 h-5 mr-2" /> 解决方案
            </h3>
            <p className="leading-relaxed opacity-90">
              利用计算机视觉技术（Computer Vision），配合车载摄像机或无人机采集图像，实现路面病害的自动识别与像素级分割。这是当前工业界的热点需求，也是智慧交通的关键一环。
            </p>
          </div>
        </div>
      </section>

      {/* Dataset Section */}
      <section className="space-y-6">
        <div className="flex items-center space-x-3 mb-4 border-b border-gray-200 pb-2">
          <Database className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold text-slate-800">2. DeepCrack 数据集</h2>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
             <h3 className="font-semibold text-slate-700 mb-4 text-center">数据集划分</h3>
             <div className="h-64">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={datasetData}
                     cx="50%"
                     cy="50%"
                     innerRadius={60}
                     outerRadius={80}
                     fill="#8884d8"
                     paddingAngle={5}
                     dataKey="value"
                     label={({name, value}) => `${name}: ${value}`}
                   >
                     {datasetData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                     ))}
                   </Pie>
                   <Tooltip />
                 </PieChart>
               </ResponsiveContainer>
             </div>
             <p className="text-center text-sm text-slate-500 mt-2">总计 537 张 RGB 图像</p>
          </div>

          <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
             <h3 className="font-semibold text-slate-700 mb-4 text-center">类别极度不平衡</h3>
             <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={imbalanceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {imbalanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={IMBALANCE_COLORS[index % IMBALANCE_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
             </div>
             <p className="text-center text-sm text-slate-500 mt-2">裂纹像素仅占 1%-5%</p>
          </div>

          <div className="lg:col-span-1 space-y-4">
            <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-semibold text-slate-700">复杂背景干扰</h4>
              <p className="text-sm text-slate-600 mt-1">包含树木阴影、路面颗粒、水渍和油污等真实场景干扰。</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-purple-400">
              <h4 className="font-semibold text-slate-700">细微特征</h4>
              <p className="text-sm text-slate-600 mt-1">部分发丝级裂纹只有1-2像素宽，对算法鲁棒性要求极高。</p>
            </div>
             <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-green-400">
              <h4 className="font-semibold text-slate-700">标注格式</h4>
              <p className="text-sm text-slate-600 mt-1">二值掩码图 (Binary Mask)，白色(255)为裂纹，黑色(0)为背景。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="space-y-6">
        <div className="flex items-center space-x-3 mb-4 border-b border-gray-200 pb-2">
          <GitBranch className="w-6 h-6 text-indigo-500" />
          <h2 className="text-2xl font-bold text-slate-800">3. 技术路线</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
           {/* Traditional */}
           <div className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
             <div className="bg-slate-100 p-4 border-b border-slate-200">
               <h3 className="font-bold text-slate-700 flex items-center">
                 <Layers className="w-4 h-4 mr-2" /> 传统机器视觉方法
               </h3>
             </div>
             <div className="p-6 space-y-4">
                <div>
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded mb-2">特征提取</span>
                  <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                    <li>基于阈值：分块自适应阈值处理光照不均。</li>
                    <li>基于滤波：利用 Frangi 滤波（Hessian矩阵）增强管状裂纹结构。</li>
                  </ul>
                </div>
                <div>
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded mb-2">后处理</span>
                  <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                    <li>形态学开运算去除噪点。</li>
                    <li>形态学闭运算连接断裂。</li>
                    <li>连通域分析剔除误检。</li>
                  </ul>
                </div>
             </div>
           </div>

           {/* Deep Learning */}
           <div className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
             <div className="bg-slate-100 p-4 border-b border-slate-200">
               <h3 className="font-bold text-slate-700 flex items-center">
                 <Cpu className="w-4 h-4 mr-2" /> 深度学习方法 (推荐)
               </h3>
             </div>
             <div className="p-6 space-y-4">
                <div>
                  <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded mb-2">常用模型</span>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm text-slate-600">U-Net</span>
                    <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm text-slate-600">DeepLabV3+</span>
                    <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm text-slate-600">Transformer</span>
                  </div>
                  <p className="text-sm text-slate-600">端到端学习像素级特征，对复杂背景鲁棒性更强。</p>
                </div>
                <div>
                  <span className="inline-block px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded mb-2">流程</span>
                  <ol className="list-decimal pl-5 text-sm text-slate-600 space-y-1">
                    <li>数据预处理 (Resize, Augmentation)</li>
                    <li>模型构建与训练 (Loss: Dice Loss + BCE)</li>
                    <li>模型推理与后处理</li>
                  </ol>
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* Evaluation Metrics */}
      <section className="space-y-6">
        <div className="flex items-center space-x-3 mb-4 border-b border-gray-200 pb-2">
          <CheckCircle2 className="w-6 h-6 text-teal-500" />
          <h2 className="text-2xl font-bold text-slate-800">4. 评估指标</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { name: 'IoU (交并比)', desc: '预测区域与真实区域的交集除以并集，衡量分割准确度的核心指标。' },
            { name: 'Dice 系数', desc: '衡量两个集合的相似度，常用于医学和工业图像分割评估。' },
            { name: 'F1 Score', desc: '精确率和召回率的调和平均数，综合衡量模型性能。' }
          ].map((metric, idx) => (
            <div key={idx} className="bg-slate-50 p-5 rounded-lg">
              <h4 className="font-bold text-slate-800 mb-2">{metric.name}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{metric.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};