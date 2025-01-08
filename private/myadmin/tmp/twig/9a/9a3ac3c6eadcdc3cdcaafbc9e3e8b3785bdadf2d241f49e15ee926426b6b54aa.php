<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* navigation/tree/database_select.twig */
class __TwigTemplate_aec0d06089db0d921fa08d0864899dd62f083a1dbfdc8abd936831367377b7a5 extends \Twig\Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 1
        echo ($context["quick_warp"] ?? null);
        echo "

<div id=\"pma_navigation_select_database\">
  ";
        // line 4
        echo ($context["list_navigator"] ?? null);
        echo "

  <div id=\"pma_navigation_db_select\">
    <form action=\"index.php\">
      ";
        // line 8
        echo PhpMyAdmin\Url::getHiddenFields(["server" => ($context["server"] ?? null)]);
        echo "

      <select name=\"db\" class=\"hide\" id=\"navi_db_select\">
        <option value=\"\" dir=\"";
        // line 11
        echo twig_escape_filter($this->env, ($context["text_dir"] ?? null), "html", null, true);
        echo "\">";
        echo _gettext("Databases");
        echo "…</option>
        ";
        // line 12
        echo ($context["options"] ?? null);
        echo "
      </select>
    </form>
  </div>
</div>

<div id=\"pma_navigation_tree_content\">
  <ul>
    ";
        // line 20
        echo ($context["nodes"] ?? null);
        echo "
  </ul>
</div>
";
    }

    public function getTemplateName()
    {
        return "navigation/tree/database_select.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  73 => 20,  62 => 12,  56 => 11,  50 => 8,  43 => 4,  37 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "navigation/tree/database_select.twig", "D:\\Dropbox\\Apache1\\htdocs\\myadmin\\templates\\navigation\\tree\\database_select.twig");
    }
}
